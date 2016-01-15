var React = require("react");
var Select = require("../components/Select");
var Toolkit = require("../Toolkit");
/**
 * @author Dylan Vorster
 */
module.exports = React.createClass({
	getDefaultProps: function(){
		return {
			value: null,
			values: ['A','B','C']
		};
	},
	
	render: function(){
		var value = this.props.values.indexOf(this.props.value);
		
		return React.createElement(Select,{value: value,change:function(value){
			Toolkit.fireCallback(this.props.change,this.props.values[value]);
		}.bind(this),groups:{"Select One":this.props.values}});
	}
});