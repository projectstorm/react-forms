var React = require("react");
var Button = React.createFactory(require("./Button"));
var ComponentMixin = require("../ComponentMixin");
/**
 * @author Dylan Vorster
 */
module.exports = React.createClass({
	mixins: [ComponentMixin({value: []})],
	getDefaultProps: function(){
		return {
			addButtonName: "Add",
			removeButtonName: "-"
		};
	},
	addRow: function(){
		this.state.value.push(this.props.children.props.value);
		this.setValue();
	},
	 
	render: function(){
		return (
			React.DOM.div({className:'storm-multi'},
				this.state.value.map(function(value,index){
					return React.DOM.div({key: index,className:'itteration'},
						React.cloneElement(this.props.children,{value: value,change: function(newValue){
							this.state.value[index] = newValue;
							this.setValue();
						}.bind(this)}),
						Button({name: this.props.removeButtonName,action: function(){
							this.state.value.splice(index,1);
							this.setValue();
						}.bind(this)})
					);
				}.bind(this)),
				Button({name:this.props.addButtonName,action: function(){
					this.addRow();
				}.bind(this)})
			)
		);
	}
});