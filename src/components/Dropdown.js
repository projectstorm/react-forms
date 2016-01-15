var React = require("react");
var ComponentMixin = require("../ComponentMixin");

/**
 * @author Dylan Vorster
 */
module.exports = React.createClass({
	displayName: "Dropdown",
	mixins: [ComponentMixin({
		stateValueFunction:function(nextprops){
			return Object.keys(nextprops.children)[0];
		}
	})],
	getDefaultProps: function(){
		return {
			action: function(selected){
				console.log("selected: ",selected);
			},
			children:{
				"rgb(0,0,0)":"black",
				"rgb(0,192,255)":"blue",
				"rgb(192,255,0)":"green",
				"rgb(255,255,255)":"white"
			}
		};
	},
	
	moveDown: function(){
		var keys = Object.keys(this.props.children);
		var index = keys.indexOf(this.state.value);
		if(index >= 0){
			index++;
			if(index >= keys.length){
				index = 0;
			}
		}else{
			index = 0;
		}
		this.setState({value: keys[index]});
	},
	
	moveUp: function(){
		var keys = Object.keys(this.props.children);
		var index = keys.indexOf(this.state.value);
		if(index >= 0){
			index--;
			if(index < 0){
				index = keys.length-1;
			}
		}else{
			index = keys.length -1;
		}
		this.setState({value: keys[index]});
	},

	render: function(){
		return (
			React.DOM.ul({className:'storm-dropdown',onKeyDown:this.onKeyPress},Object.keys(this.props.children).map(function(key){
				return React.DOM.li({
					key: key,
					onMouseEnter: function(){
						this.setState({value:key});
					}.bind(this),
					onClick: function(){
						this.props.action(key);
					}.bind(this),
					className:"item "+(this.state.value == key?'selected':'')},
						this.props.children[key])
			}.bind(this)))
		);
	}
});