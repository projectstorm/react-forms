var React = require("react");
var Button = require("./elements/Button");
var Engine = require("./Engine");

/**
 * @author Dylan Vorster
 * @type @exp;React@call;createClass
 */
module.exports = React.createClass({
	displayName: "form",
	getDefaultProps: function(){
		return {
			children: [],
			showButtons: true,
			action: function(model){
				console.log("No action registered for form yet",model);
			}
		};
	},
	getInitialState: function(){
		return {model:{}};
	},
	submit: function(){
		
		if(this.refs.model){
			this.props.action(this.refs.model.getValue());
		}else{
			this.props.action(this.state.model);
		}
	},
	
	storeValue: function(key,value){
		this.state.model[key] = value;
	},
	
	render: function(){
		return (
			React.createElement("form",{className: "storm-form"},
				Engine.modelHelper(this.props.children,this.storeValue),
				this.props.showButtons?
					React.createElement(Button,{"name": "Submit",action:this.submit}):null
			)
		);
	}
});