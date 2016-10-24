var Toolkit = require("./Toolkit");
/**
 * @author Dylan Vorster
 */
module.exports = function(ob){
	ob = ob || {};
	return {
		getDefaultProps: function(){
			return {
				value: ob.value || undefined,
				change: function(value){

				}
			};
		},
		getInitialState: function(){
			var value = this.props.value;
			if(typeof ob.stateValueFunction === 'function'){
				value = ob.stateValueFunction(this.props);
			}
			return {
				resetValue: this.props.value,
				value: value
			};
		},

		componentWillReceiveProps: function(nextProps){
			console.log(this.props.name,nextProps);
			if(nextProps.value !== undefined){
				this.setState({value: nextProps.value});
			}
		},

		clean: function(value){
			if(Array.isArray(value)){
				return value;
			}
			if(value === ""){
				return null;
			}
			if(value === undefined){
				return null;
			}
			return value;
		},

		reset: function(){
			this.state.value = this.state.resetValue;
			this.setState(this.state,function(){
				Toolkit.fireCallback(this.props.change,this.clean(this.state.resetValue));
			}.bind(this));
		},

		fireChangeEvent: function(){
			Toolkit.fireCallback(this.props.change,this.clean(this.state.value));
		},

		setValue: function(value){
			if(value === undefined){
				value = this.state.value;
			}
			this.state.value = value;
			this.setState(this.state,function(){
				Toolkit.fireCallback(this.props.change,this.clean(value));
			}.bind(this));
		},

		getValue: function(){
			return this.clean(this.state.value);
		}
	};
};
