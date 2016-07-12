var React = require("react");
/**
 * @author Dylan Vorster
 */
module.exports = React.createClass({
	displayName: 'group',
	_isStormGroup: true,

	getDefaultProps: function(){
		return {
			component: 'div'
		};
	},

	itterate: function(cb){
		Object.keys(this.refs).forEach(function(ref){
			cb(this.refs[ref],ref);
		}.bind(this));
	},

	reset: function(){
		this.itterate(function(comp){
			if(comp.reset){
				comp.reset();
			}
		});
	},

	getValue: function(){

		var model = {};
		this.itterate(function(comp,name){
			if(comp.getValue){
				model[name] = comp.getValue();
			}
		});
		return model;
	},

	bindChildren: function(children){
		return React.Children.map(children, function(child){
			if(!React.isValidElement(child)){
				return child;
			}
			var children = null;

			//bind the children
			if(typeof child.getValue !== 'function' && child.props.children){
				children = this.bindChildren(child.props.children);
			}

			//bind the name
			if(child.props.name){
				return React.cloneElement(child,{
					generatePlaceholder: true,
					ref: child.props.name
				},children);
			}
			return React.cloneElement(child,null,children);
		}.bind(this));
	},

	render: function(){
		return React.createElement(this.props.component,{className:'storm-group'},this.bindChildren(this.props.children));
	}
});
