var React = require("react");
var Engine = require("../Engine");
/**
 * @author Dylan Vorster
 * @type @exp;React@call;createClass
 */
module.exports = React.createClass({
	displayName: "Model",
	getDefaultProps: function(){
		return {
			name: "Unknown Model",
			labels: true,
			vertical:true,
			sideLabels: true
		};
	},
	getInitialState: function(){
		return {
			model: {}
		};
	},
	
	storeValue: function(key,value){
		this.state.model[key] = value;
		
		//push the event upwards
		this.props.handler(this.props.name,this.state.model);
	},
	
	generateElement: function(element){
		return React.createElement('td',{style: {visibility:(element.visible || true)?'visible':'hidden'}},Engine.generateElement(element));
	},
	generateLabel: function(element){
		return React.createElement('td',{style: {visibility:(element.visible || true)?'visible':'hidden'}},Engine.generateLabel(element));
	},
	
	generateVerticalRowSideLabels: function(element){
		
		//are we displaying the labels
		var children = [];
		if(this.props.labels){
			children.push(this.generateLabel(element));
		}
		
		children.push(this.generateElement(element));
				
		//each element is rendered as a row
		return React.createElement('tr',element.key,children);
	},
	
	generateVertical: function(children){
		var elements = [];
		React.Children.forEach(children,function(element){
			if(!this.props.sideLabels){
				elements.push(React.createElement('tr',null,element));
			}else{
				elements.push(this.generateVerticalRowSideLabels(element));
			}
		}.bind(this));
		return elements;
	},
	
	generateHorizontal: function(parentChildren){
		var elements;
		var labels = [];
		var children = [];
		React.Children.forEach(parentChildren,function(element){
			labels.push(this.generateLabel(element));
			children.push(this.generateElement(element));
		}.bind(this));
		
		if(this.props.labels){
			elements.push(React.createElement('tr',{key:elements.length},labels));
		}
		elements.push(React.createElement('tr',{key:elements.length},children));
		return elements;
	},
	
	render: function(){
		var children = Engine.modelHelper(this.props.children,this.storeValue);
		//update the state
		if(this.props.vertical){
			children = this.generateVertical(children);
		}else{
			children = this.generateHorizontal(children);
		}
		
		return React.DOM.table({className:"storm-model" },React.DOM.tbody(null,children));
	}
});