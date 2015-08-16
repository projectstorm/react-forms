var React	= require("react");
var _merge = require("lodash/object/merge");

/**
 * @author Dylan Vorster
 * @type type
 */
module.exports = {
	factories: {},
	
	registerClass: function(type,reactClass){
		this.factories[type] = reactClass;
	},
	
	isLayoutElement: function(element){
		return element.type.prototype !== undefined && typeof element.type.prototype.storeValue === 'function';
	},
	
	modelHelper: function(children,handler){
		
		var elements = [];
		if(!children){
			return [];
		}
		if(Array.isArray(children)){
			elements = children.map(function(child){
				return this.generateElement(child);
			}.bind(this));
		}else{
			elements = this.generateElement(children);
		}
		
		//pass in a handler
		return this.bind(elements,handler);
	},
	
	bind: function(children,handler){
		if(!children){
			return;
		}
		return React.Children.map(children, function(childElement){
			//can happen that a model is passed in
			if(!childElement._isReactElement){
				return this.generateElement(childElement,{handler:handler});
			}
			
			var nestedChildren = null;
			
			//if the item is a layout element, dont go through its children, let it do that itself
			if(this.isLayoutElement(childElement)){
				nestedChildren = childElement.props.children;
			}
			
			//if we get here then there are normal children
			else if(childElement.props){
				nestedChildren = this.bind(childElement.props.children,handler);
			}
			
			//replace the element with 
			return React.cloneElement(childElement, {handler:handler},nestedChildren);
		}.bind(this));
	},
	
	/**
	 * Helper method for generating a label form an element model
	 * @param {type} elementModel
	 * @returns {unresolved}
	 */
	generateLabel: function(elementModel){
		var label = null;
		//if its a react element then just use it
		if(elementModel._isReactElement){
			if(elementModel.props.name){
				label = elementModel.props.name;
			}else{
				return elementModel;
			}
		}
		
		else if(typeof elementModel === 'string'){
			elementModel = {name: elementModel};
		}
		
		label = label || elementModel.label || elementModel.name || "na";
		return React.createElement('label',null,label);
	},

	/**
	 * Factory method for generating an element from a model
	 * 
	 * @param {type} elementModel
	 * @returns {unresolved}
	 */
	generateElement: function(elementModel,extraProps){
		if(!elementModel){
			throw "element was undefined";
		}
		
		//if its a react element then just use it
		if(React.isValidElement(elementModel)){
			return elementModel;
		}
		
		if(typeof elementModel === 'string'){
			elementModel = {name: elementModel};
		}
		
		elementModel.ref = elementModel.name;
		
		var type = elementModel.type || "text";
		return React.createElement(this.factories[type],_merge(elementModel,extraProps || {} ));
	},
	
	render: function(model,element){
		var Form = require("./Form");
		return React.render(React.createElement(Form,model),element);
	}
};

module.exports.factories = {
	"input":require("./elements/TextInput"), //alias
	"textinput":require("./elements/TextInput"), //alias
	"text":require("./elements/TextInput"),
	
	"pass":require("./elements/Password"),
	"password": require("./elements/Password"),//alias
	
	"model":require("./layout/Model"),
	"multi":require("./layout/Multi"),
	
	"select":require("./elements/Select"),
	"dropdown":require("./elements/Select"), //alias
	
	"boolean":require("./elements/CheckBox"), //alias
	"checkbox":require("./elements/CheckBox"),
	
	"file":require("./elements/File"),
	"area":require("./elements/TextArea"),
	"auto":require("./elements/AutoInput")
};

module.exports.form = require("./Form");