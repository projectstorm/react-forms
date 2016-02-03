var React = require("react");
var group = require("./Group");
var button = require("./Button");
/**
 * @author Dylan Vorster
 */
module.exports = React.createClass({
	getDefaultProps: function(){
		return {
			showReset: true,
			onSubmit: function(model){
				
			}
		};
	},
	
	bindChildren: function(children){
		return React.Children.map(children, function(child){
			//string
			if(!React.isValidElement(child)){
				return child;
			}
			var children = null;
			
			//bind the children
			if(typeof child.getValue !== 'function' && child.props.children){
				children = this.bindChildren(child.props.children);
			}
			
			//bind the name
			if(child.props.name && child.type.displayName === 'TextField'){
				console.log(child.props.name);
				return React.cloneElement(child,{
					onKeyDown:function(event){
						if(event.keyCode === 13){
							this.fireSubmit();
						}
					}.bind(this)
				},children);
			}
			return React.cloneElement(child,null,children);
		}.bind(this));
	},
	
	fireSubmit: function(){
		this.props.onSubmit(this.refs.group.getValue());
	},
	
	render: function(){
		
		
		var children = this.props.children._isStormGroup?
				React.cloneElement(this.props.children,{ref: 'group'}):
				React.createElement(group,{ref: 'group'},this.props.children);
		
		return (
			React.DOM.form({className: 'storm-form'},
				this.bindChildren(children),
				React.createElement(button,{name:"Submit",action: function(){
					this.fireSubmit();
				}.bind(this)}),
			
				//show the reset button?
				this.props.showReset?
					React.createElement(button,{name:"Reset",action: function(){
						this.refs.group.reset();
					}.bind(this)}):null
			)
		);
	}
});