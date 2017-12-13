import * as React from "react";
import {BaseElementWidget} from "../core/BaseElementWidget";
import {BaseWidget, BaseWidgetProps} from "../core/BaseWidget";

export interface TableLayoutWidgetProps extends BaseWidgetProps{
}

export interface TableLayoutWidgetState{
}

/**
 * @author dylanvorster
 */
export class TableLayoutWidget extends BaseWidget<TableLayoutWidgetProps, TableLayoutWidgetState> {

	constructor(props: TableLayoutWidgetProps){
		super('srf-table',props);
		this.state = {
		}
	}

	render() {
		return (
			<table {...this.getProps()}>
				<tbody>
					{
						React.Children.map(this.props.children,(child: JSX.Element) => {
							var label = BaseElementWidget.getLabel(child.props);
							if(label){
								return (
									<tr className={this.bem('__row')}>
										<td><label className={this.bem('__label')}>{label}</label></td>
										<td>{child}</td>
									</tr>
								);
							}

							return(
								<tr className={this.bem('__row')}>
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
