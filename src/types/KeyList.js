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
		};
	},
	
	getInitialState: function(){
		return {
			value:this.props.value
		};
	},
	
	componentWillReceiveProps: function(nextProps){
		this.setState({value: nextProps.value});
	},
	
	generateID: function(){
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = crypto.getRandomValues(new Uint8Array(1))[0]%16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	},
	
	render: function(){
		return (
			React.DOM.div({className:'storm-list'},Object.keys(this.props.values).map(function(key){
				
				var uuid = this.generateID();
				
				return React.DOM.div({className:'item '+(this.state.value.indexOf(key) !== -1?'selected':''),key:key},
					React.createElement(Checkbox,{id:uuid,value: this.state.value.indexOf(key) !== -1, change: function(value){
						if(value){
							this.state.value.push(key);
							this.state.value = _unique(this.state.value);
						}else{
							_pull(this.state.value,key);
						}
						this.setState(this.state);
						Toolkit.fireCallback(this.props.change,this.state.value);
					}.bind(this)}),
					React.DOM.label({htmlFor:uuid},this.props.values[key])
				);
			}.bind(this)))
		);
	}
});