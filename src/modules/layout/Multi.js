var React = require("react");
var Engine = require("../Engine");
var Button = require("../elements/Button");
/**
 * @author Dylan Vorster
 * @type @exp;React@call;createClass
 */
module.exports = React.createClass({
	
	getInitialState: function(){
		return {children: [],index: 0,model:{}};
	},
	
	getValue: function(){
		var temp = [];
		this.state.children.forEach(function(element){
			if(this.refs[element].getValue !== undefined){
				temp.push(this.refs[element].getValue());
			}
		}.bind(this));
		return temp;
	},
	
	storeValue: function(key,value){
		if(value === null){
			delete this.state.model[''+key];
		}else{
			this.state.model[''+key] = value;
		}
		
		//push the event upwards
		this.props.handler(this.props.model.name,this.state.model);
	},
	
	removeRow: function(index){
		this.state.children.splice(this.state.children.indexOf(parseInt(index)),1);
		this.storeValue(index,null);
		this.setState(this.state);
		
	},
	addRow: function(){
		this.state.index++;
		this.state.children.push(this.state.index);	
		this.setState(this.state);
	},
	
	render: function(){
		var temp = [];
		this.state.children.forEach(function(element){
			this.props.model.ref = element;
			temp.push(React.createElement("tr",{key: element},
				React.createElement("td",null,
					Engine.generateElement(this.state.model,{
						handler: function(key,value){
							this.storeValue(element,value);
						}.bind(this)
					})
				),
				React.createElement("td",null,React.createElement(Button,{
					name:"remove",action:function(){
						this.removeRow(element);
					}.bind(this)
				}))
			));
		}.bind(this));
		
		//add the extra button
		temp.push(React.createElement('tr',null,
				React.createElement('td',{colSpan:2},
					React.createElement(Button,{name:"Add",action:this.addRow}))));
		
		return React.DOM.table(null,React.DOM.tbody(null,temp));
	}
});