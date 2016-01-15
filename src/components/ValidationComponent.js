var React = require("react");
var ErrorComponent = require("./ErrorComponent");
var Toolkit = require("../Toolkit");
var ComponentMixin = require("../ComponentMixin");
/**
 * @author Dylan Vorster
 */
module.exports = React.createClass({
	displayName: 'Validation Component',
	mixins: [ComponentMixin()],
	getDefaultProps: function(){
		return {
			required: false,
			validate: function(value){
				return true;
			}
		};
	},
	getInitialState: function(){
		return {
			error: false
		};
	},
	validate: function(value,fireChange){
		
		
		
		if(fireChange === undefined){
			fireChange = true;
		} 
		this.state.value = value;
		
		var isEmpty = value === null || value === [] || false;
		
		if((this.props.required && isEmpty) || !isEmpty){
			var error = this.props.validate(value);
			if(error === false){
				this.state.error = "Validation Failed";
			}else if(typeof error === 'string'){
				this.state.error = error;
			}else{
				this.state.error = false;
			}
		}
		this.setState(this.state,fireChange?function(){
			if(this.state.error === false){
				Toolkit.fireCallback(this.props.change,value);
			}
		}:null);
	},
	componentWillMount: function(){
		this.validate(this.props.value,false);
	},
	componentWillReceiveProps: function(nextProps){
		if(nextProps.value){
			this.validate(nextProps.value,false);
		}
	},
	render: function(){
		return(
			React.createElement(ErrorComponent,{error: this.state.error},
				React.Children.map(this.props.children,function(child){
					return React.cloneElement(child,{
						value: this.state.value,
						change: function(value){
							this.validate(value);
						}.bind(this)
					});
				}.bind(this))
			)
		);
	}
});