var React = require("react");
var _merge = require("lodash/merge");
var ComponentMixin = require("../ComponentMixin");
/**
 * @author Dylan Vorster
 */
module.exports = React.createClass({
	displayName: "Checkbox",
	mixins: [ComponentMixin({value: false})],
	
	render: function(){
		
		var props = _merge({
			type: "checkbox",
			className: "storm-checkbox",
			onChange: function(){
				this.setValue(!this.state.value);
			}.bind(this)
		},this.props);
		
		props.checked = this.state.value;
		
		return React.DOM.input(props);
	}
});