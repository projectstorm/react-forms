import * as React from "react";
import * as _ from "lodash";
import * as PropTypes from 'prop-types';
import {BaseElementWidget, BaseElementWidgetProps, BaseElementWidgetState} from "../core/BaseElementWidget";
import {FormContext} from "../core/FormWidget";

export interface FieldElementWidgetProps extends BaseElementWidgetProps<string> {
	placeholder?: string;
	livetype?: boolean;
	submitOnEnter?: boolean;
	type?: string;
	autoComplete?: any;
}

export interface FieldElementWidgetState extends BaseElementWidgetState<string> {
}

/**
 * @author dylanvorster
 */
export class FieldElementWidget extends BaseElementWidget<string, FieldElementWidgetProps, FieldElementWidgetState> {

	context: FormContext;

	static contextTypes = {
		form: PropTypes.any
	}

	public static defaultProps: FieldElementWidgetProps = _.extend(BaseElementWidget.defaultProps, {
		submitOnEnter: false,
		livetype: false,
	});


	constructor(props: FieldElementWidgetProps) {
		super(props);
	}

	render() {
		var props = {
			className: "storm-field",
			...this.props,
			placeholder: (this.props as FieldElementWidgetProps).placeholder || this.props.label || this.props.name,
			onChange: (event) => {
				this.setValue(event.target.value, this.props.livetype);
			}
		};

		// fix for autocomplete
		if (this.props.autoComplete === "off" && this.props.type === "password") {
			props['autoComplete'] = "new-password";
		}

		props['onKeyPress'] = (event) => {
			if (event.key === 'Enter') {

				//dont reload the page
				event.preventDefault();

				//livetype
				if (this.props.livetype === false && this.props.valueChangedEvent) {
					this.props.valueChangedEvent(this.state.value);
				}

				//enter button is used to submit form
				if (this.props.submitOnEnter && this.context.form) {
					this.context.form.fireFormSubmitEvent();
				}
			}
		};

		//only add the value if its valid
		if (this.getValue()) {
			props['value'] = this.getValue();
		} else {
			props['value'] = "";
		}

		return (
			<input {...props} />
		);
	}
}

export var FieldElementWidgetFactory = React.createFactory(FieldElementWidget);
