import * as React from "react";
import * as PropTypes from "prop-types";
import { BaseElementWidget, BaseElementWidgetProps, BaseElementWidgetState } from "../core/BaseElementWidget";
import { FormContext } from "../core/FormWidget";

export interface CheckboxElementWidgetProps extends BaseElementWidgetProps<boolean> {}

export interface CheckboxElementWidgetState extends BaseElementWidgetState<boolean> {}

export class CheckboxElementWidget extends BaseElementWidget<
	boolean,
	CheckboxElementWidgetProps,
	CheckboxElementWidgetState
> {
	context: FormContext;

	static contextTypes = {
		form: PropTypes.any
	};

	constructor(props: CheckboxElementWidgetProps) {
		super("srf-checkbox", props);
	}

	render() {
		return (
			<input
				{...this.getProps()}
				type="checkbox"

				checked={this.state.value}
				onChange={event => {
					this.setValue(event.target.checked);
				}}
			/>
		);
	}
}
