var React = require("react");
var group = require("./Group");
var button = require("./Button");
/**
 * @author Dylan Vorster
 */
module.exports = React.createClass({
	getDefaultProps: function(){
		return {
			onSubmit: function(model){
				
			}
		};
	},
	
	render: function(){
		return (
			React.DOM.form({className: 'storm-form'},
				this.props.children._isStormGroup?
					React.cloneElement(this.props.children,{ref: 'group'}):
					React.createElement(group,{ref: 'group'},this.props.children),
				React.createElement(button,{name:"Submit",action: function(){
					this.props.onSubmit(this.refs.group.getValue());
				}.bind(this)}),
				React.createElement(button,{name:"Reset",action: function(){
					this.refs.group.reset();
				}.bind(this)})
			)
		);
	}
});