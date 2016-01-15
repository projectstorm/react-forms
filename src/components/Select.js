var React = require("react");
var _merge = require("lodash/merge");
var ComponentMixin = require("../ComponentMixin");
/**
 * @author Dylan Vorster
 */
module.exports = React.createClass({
	mixins: [ComponentMixin({value: 0,stateValueFunction: function(props){
		var initial = props.value;
		var first = true;
		loop:
		for(var i in props.groups){
			for(var j in props.groups[i]){
				if(j == props.value){
					initial = j;
					break loop;
				}
				if(first){
					initial = j;
					first = false;
				}
			}
		}
		return initial;
	}})],
	getDefaultProps: function(){
		return {
			groups: {
				group1:{
					0:"item 1",
					1:"item 2"
				}
			}
		};
	},
	
	render: function(){
		
		var props = _merge({
			className: "storm-select",
			onChange: function(event){
				this.setValue(event.target.value);
			}.bind(this)
		},this.props);
		
		props.value = this.state.value;
		
		return (
			//render the select
			React.DOM.select(props,Object.keys(this.props.groups).map(function(group){
				
				//render the groups
				return React.DOM.optgroup({label:group,key:group},Object.keys(this.props.groups[group]).map(function(key){
					
					//render each option
					return React.DOM.option({value:key,key:key},this.props.groups[group][key]);
				}.bind(this)));
			}.bind(this)))
		);
	}
});