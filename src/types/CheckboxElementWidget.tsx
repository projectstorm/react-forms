import * as React from "react";
import * as _ from "lodash";
import * as PropTypes from 'prop-types';
import {BaseElementWidget, BaseElementWidgetProps, BaseElementWidgetState} from "../core/BaseElementWidget";
import {FormContext} from "../core/FormWidget";

export interface CheckboxElementWidgetProps extends BaseElementWidgetProps<boolean> {
}

export interface CheckboxElementWidgetState extends BaseElementWidgetState<boolean> {
}

/**
 * @author dylanvorster
 */
export class CheckboxElementWidget extends BaseElementWidget<boolean, CheckboxElementWidgetProps, CheckboxElementWidgetState> {

	context: FormContext;

	static contextTypes = {
		form: PropTypes.any
	}

	constructor(props: CheckboxElementWidgetProps) {
		super(props);
	}

	render() {

		return (
			<input type="checkbox" {...this.props as any} checked={this.state.value} onChange={(event) => {
				this.setValue(event.target.checked);
			}}/>
		);
	}
}

export var CheckboxElementWidgetFactory = React.createFactory(CheckboxElementWidget);
