import * as React from "react";
import * as _ from "lodash";
import {BaseElementWidget, BaseElementWidgetProps, BaseElementWidgetState} from "../core/BaseElementWidget";

export interface SelectElementWidgetProps extends BaseElementWidgetProps<string>{
	groups: any;
}

export interface SelectElementWidgetState extends BaseElementWidgetState<string>{
}

/**
 * @author dylanvorster
 */
export class SelectElementWidget  extends BaseElementWidget<string,SelectElementWidgetProps, SelectElementWidgetState>  {

	public static defaultProps: SelectElementWidgetProps = {
		groups: {}
	};

	constructor(props: SelectElementWidgetProps){
		super(props);
	}

	render() {
		var props = {
			className: "storm-select",
			onChange: (event) => {
				this.setValue(event.target.value);
			}
		};

		//only add the value if its valid
		if(this.getValue()){
			props['value'] = this.getValue();
		}

		return (
			<select {...props}>
				{
					//render the groups
					_.keys((this.props as SelectElementWidgetProps).groups).map((group) => {
						return (
							<optgroup label={group} key={group}>
								{
									//render each option
									_.keys((this.props as SelectElementWidgetProps).groups[group]).map((key) => {
										return (
											<option value={key} key={key}>{(this.props as SelectElementWidgetProps).groups[group][key]}</option>
										);
									})
								}
							</optgroup>
						);
					})
				}
			</select>
		);
	}
}

export var SelectElementWidgetFactory = React.createFactory(SelectElementWidget);