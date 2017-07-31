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
			<table>
				<tbody>
					{
						React.Children.map(this.props.children,(child: JSX.Element) => {
							var label = BaseElementWidget.getLabel(child.props);
							if(label){
								return (
									<tr>
										<td><label>{label}</label></td>
										<td>{child}</td>
									</tr>
								);
							}

							return(
								<tr>
									<td colSpan={2}>{child}</td>
								</tr>
							);
						})
					}
				</tbody>
			</table>
		);
	}
}

export var TableLayoutWidgetFactory = React.createFactory(TableLayoutWidget);