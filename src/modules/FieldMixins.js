module.exports = {
	getInitialState: function(){
		return { value: null };
	},
	getDefaultProps: function(){
		return { placeholder: null,onChange: function(){} };
	},

	change: function(event){
		this.state.value = event.target.value;
		this.setState(this.state);
		this.props.handler(this.props.name,this.state.value);
	},
	
	/**
	 * Gets a placeholder for the element.
	 */
	getPlaceholder: function(){
		return this.props.placeholder || this.props.label || this.props.name || "";
	}
};