var React = require("react");
var Toolkit = require("../Toolkit");
/**
 * @author Dylan Vorster
 */
module.exports = React.createClass({
	render: function(){
		return (
			React.DOM.table(this.props,
				React.DOM.tbody(null,
					React.Children.map(this.props.children,function(child){
						
						var label = Toolkit.generateLabel(child.props);
						
						if(label){
							return (
								React.DOM.tr({},
									React.DOM.td({},label),
									React.DOM.td({},child)
								)
							);
						}
						
						return(
							React.DOM.tr({},
								React.DOM.td({colSpan:"2"}, child)
							)
						);
					})
				)
			)
		);
	}
});