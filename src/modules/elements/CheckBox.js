var React	= require('react');
/**
 * @author Dylan Vorster
 */
module.exports = React.createClass({
	displayName: "Checkbox",
	getInitialState: function(){
		return {isChecked: false};
	},
	onChange: function(){
		this.setState({isChecked: !this.state.isChecked});
		if(this.props.event !== undefined){
			this.props.event(!this.state.isChecked);
		}
	},
	render: function(){
		return React.createElement('input',{
			className: "storm-checkbox",
			type: "checkbox",
			checked:this.state.isChecked,
			onChange: this.onChange
		});
	}
});