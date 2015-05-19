var React = require("react");
/**
 * @author Dylan Vorster
 */
module.exports = React.createClass({
	displayName:"Select",
	getInitialState: function(){
		if(Array.isArray(this.props.options)){
			return { value: this.props.options.length === 0? null: this.props.options[0] };
		}else{
			for(var i in this.props.options){
				return {value: i};
			}
			return {value: null};
		}
	},
	getDefaultProps: function(){
		return {
			options: {}
		};
	},
	onChange: function(event){
		this.state.value = event.target.value;
		this.setState(this.state);
		this.props.handler.storeValue(this.props.name,this.state.value);
	},
	render: function(){
		
		var temp = [];
		if(Array.isArray(this.props.options)){
			this.props.options.forEach(function(prop,key){
				temp.push(React.createElement('option',{value:prop},prop));
			});
		}else{
			for(var i in this.props.options){
				temp.push(React.createElement('option',{value:i},this.props.options[i]));
			}
		}
		
		return React.createElement("select",{type:"text",onChange:this.onchange},temp);
	}
});