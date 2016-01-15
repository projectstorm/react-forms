var React = require("react");
/**
 * @author Dylan Vorster
 */
module.exports = React.createClass({
	displayName: "Button",
	getDefaultProps: function(){
		return {
			name: "Button",
			action: function(){
				console.log("Button Clicked");
			}
		};
	},
	click: function(event){
		this.props.action(event);
	},
	render: function(){
		return React.DOM.input({
			className:"storm-button",
			type:"button",
			value:this.props.name,
			onClick: this.click
		});
	}
});