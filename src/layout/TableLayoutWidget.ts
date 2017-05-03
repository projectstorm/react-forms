import * as React from "react";
import {ReactElement} from "../../../React Diagrams/node_modules/@types/react/index";
import {BaseElementWidget} from "../core/BaseElementWidget";

export interface TableLayoutWidgetProps{
}

export interface TableLayoutWidgetState{
}

/**
 * @author dylanvorster
 */
export class TableLayoutWidget extends React.Component<TableLayoutWidgetProps, TableLayoutWidgetState> {

	public static defaultProps: TableLayoutWidgetProps = {
	};

	constructor(props: TableLayoutWidgetProps){
		super(props);
		this.state = {
		}
	}

	render() {
		return (
			React.DOM.table(this.props,
				React.DOM.tbody(null,
					React.Children.map(this.props.children,(child: ReactElement<any>) => {
						var label = BaseElementWidget.getLabel(child.props);
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
								React.DOM.td({colSpan:2}, child)
							)
						);
					})
				)
			)
		);
	}
}

export var TableLayoutWidgetFactory = React.createFactory(TableLayoutWidget);