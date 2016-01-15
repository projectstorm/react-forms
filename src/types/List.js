var React = require("react");
var KeyList = require("../types/KeyList");
var Toolkit = require("../Toolkit");
var _at = require("lodash/at");
/**
 * @author Dylan Vorster
 */
module.exports = React.createClass({
	getDefaultProps: function(){
		return {
			value: [],
			values: ["a","b"]
		};
	},

	render: function(){
	
		var temp = [];
		for(var i = 0;i < this.props.value.length;i++){
			temp.push(""+this.props.values.indexOf(this.props.value[i]));
		}
		
		return React.createElement(KeyList,{values:this.props.values,value: temp,change: function(value){
			console.log(value);
			Toolkit.fireCallback(this.props.change,_at(this.props.values,value));
		}.bind(this)});
	}
});