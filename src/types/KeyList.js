var React = require("react");
var Checkbox = require("../components/Checkbox");
var _unique = require("lodash/uniq");
var _pull = require("lodash/pull");
var Toolkit = require("../Toolkit");
/**
 * @author Dylan Vorster
 */
module.exports = React.createClass({
	getDefaultProps: function(){
		return {
			value: [],
			values: {
				0:"Apples",
				1:"Orange"
			}
		}
	},
	
	getInitialState: function(){
		return {
			value:this.props.value
		};
	},
	
	componentWillReceiveProps: function(nextProps){
		this.setState({value: nextProps.value});
	},
	
	render: function(){
		return (
			React.DOM.div({className:'storm-list'},Object.keys(this.props.values).map(function(key){
				return React.DOM.div({className:'item',key:key},
					React.createElement(Checkbox,{value: this.state.value.indexOf(key) !== -1, change: function(value){
						if(value){
							this.state.value.push(key);
							this.state.value = _unique(this.state.value);
						}else{
							_pull(this.state.value,key);
						}
						this.setState(this.state);
						Toolkit.fireCallback(this.props.change,this.state.value);
					}.bind(this)}),
					React.DOM.label({},this.props.values[key])
				);
			}.bind(this)))
		);
	}
});