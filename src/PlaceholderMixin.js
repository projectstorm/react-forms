module.exports = {
	getDefaultProps: function(){
		return {
			generatePlaceholder: false
		};
	},
	getPlaceholder: function(){
		if(this.props.generatePlaceholder){
			return this.props.name;
		}
	}
};