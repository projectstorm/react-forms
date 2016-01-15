var React = require("react");
var _merge = require("lodash/merge");
var ComponentMixin = require("../ComponentMixin");
var PlaceholderMixin = require("../PlaceholderMixin");

/**
 * @author Dylan Vorster
 */
module.exports = React.createClass({
	displayName: "TextField",
	mixins: [ComponentMixin(),PlaceholderMixin],
	getDefaultProps: function(){
		return {
			type: 'text'
		};
	},
	
	render: function(){ 
		
		var props = _merge({
			className: "storm-field",
			placeholder: this.getPlaceholder(),
			onChange: function(event){
				this.setValue(event.target.value);
			}.bind(this)
		},this.props);
		props.value = this.state.value;
		
		return React.DOM.input(props);
	}
});