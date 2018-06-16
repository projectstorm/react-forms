import * as React from "react";
import * as _ from "lodash";
import * as PropTypes from "prop-types";
import { BaseElementWidget, BaseElementWidgetProps, BaseElementWidgetState } from "../core/BaseElementWidget";
import { FormContext } from "../core/FormWidget";

export interface FieldElementWidgetProps extends BaseElementWidgetProps<string> {
	placeholder?: string;
	livetype?: boolean;
	submitOnEnter?: boolean;
	type?: string;
	autoComplete?: any;
	textArea?: boolean;
}

export interface FieldElementWidgetState extends BaseElementWidgetState<string> {}

export class FieldElementWidget extends BaseElementWidget<string, FieldElementWidgetProps, FieldElementWidgetState> {
	context: FormContext;

	static contextTypes = {
		form: PropTypes.any
	};

	public static defaultProps: FieldElementWidgetProps = _.extend(BaseElementWidget.defaultProps, {
		submitOnEnter: false,
		livetype: false
	});

	constructor(props: FieldElementWidgetProps) {
		super("srf-field", props);
	}

	render() {
		var props = {
			...this.getProps(),
			placeholder: (this.props as FieldElementWidgetProps).placeholder || this.props.label || this.props.name,
			onChange: event => {
				this.setValue(event.target.value, this.props.livetype);
			},
			onKeyPress: (event) => {
				if (event.key === 'Enter') {

					//livetype
					if (this.props.livetype === false && this.props.valueChangedEvent) {
						event.preventDefault();
						this.props.valueChangedEvent(this.state.value);
					}

					//enter button is used to submit form
					if (this.props.submitOnEnter && this.context.form) {
						event.preventDefault();
						this.context.form.fireFormSubmitEvent();
					}
				}
			},

			// text fields must at least have an empty string
			value: this.getValue() || ""
		};

		// fix for autocomplete
		if (this.props.autoComplete === "off" && this.props.type === "password") {
			props["autoComplete"] = "new-password";
		}

		if(this.props.textArea){
			return <textarea {...props} />;
		}

		return (
			<input {...props} />
		);
	}
}

export var FieldElementWidgetFactory = React.createFactory(FieldElementWidget);
