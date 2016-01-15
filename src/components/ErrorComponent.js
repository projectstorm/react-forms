var React = require("react");
/**
 * @author Dylan Vorster
 */
module.exports = React.createClass({
	
	getDefaultProps: function(){
		return {
			error: false
		};
	},
	
	getInitialState: function(){
		return {
			show: this.props.error?true:false
		};
	},
	
	componentWillReceiveProps: function(nextProps){
		if(nextProps.error){
			this.setState({show: true});
		}
	},
	
	render: function(){
		
		return React.DOM.div({className:(this.props.error && this.state.show)?'storm-error':''},
			this.props.children,
			(this.props.error && this.state.show)?React.DOM.div({className:'error',onClick: function(){
				this.setState({show:false});
			}.bind(this)},this.props.error):null
		);
	}
});