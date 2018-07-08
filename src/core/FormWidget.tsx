import * as React from "react";
import { ButtonElementWidget } from "./ButtonElementWidget";
import { FormGroupWidget } from "./FormGroupWidget";
import { ReactElement } from "react";
import * as PropTypes from "prop-types";
import { BaseWidget, BaseWidgetProps } from "@projectstorm/react-core";

export interface FormWidgetProps extends BaseWidgetProps {
	formSubmitEvent?: (model: any) => any;

	//show buttons?
	showReset?: boolean;
	showSubmit?: boolean;

	//buttons
	submitButton?: string;
	resetButton?: string;

	children?: JSX.Element | JSX.Element[];
	value?: any;
}

export interface FormWidgetState {}

export interface FormContext {
	form: FormWidget;
}

/**
 * @author Dylan Vorster
 */
export class FormWidget extends BaseWidget<FormWidgetProps, FormWidgetState> {
	rootGroup: FormGroupWidget;

	static childContextTypes = {
		form: PropTypes.any
	};

	public static defaultProps: FormWidgetProps = {
		showReset: true,
		showSubmit: true,
		submitButton: "Submit",
		resetButton: "Reset"
	};

	constructor(props: FormWidgetProps) {
		super("srf-form", props);
		this.state = {};
	}

	fireFormSubmitEvent(action?: (model: any) => any) {
		if (action) {
			return action(this.rootGroup.getValue());
		} else {
			return this.props.formSubmitEvent(this.rootGroup.getValue());
		}
	}

	getChildContext(): FormContext {
		return { form: this };
	}

	getChildren(): ReactElement<any> {
		if (React.isValidElement(this.props.children)) {
			// it is already a form group
			if ((this.props.children.type["__proto__"] as any) === FormGroupWidget) {
				return React.cloneElement(this.props.children, {
					ref: element => {
						this.rootGroup = element;
					}
				});
			}
		}

		return (
			<FormGroupWidget
				value={this.props.value}
				name=""
				ref={element => {
					this.rootGroup = element;
				}}
			>
				{this.props.children}
			</FormGroupWidget>
		);
	}

	render() {
		return (
			<form {...this.getProps()} autoComplete="off">
				{this.getChildren()}
				<div className={this.bem("__buttons")}>
					{this.props.showSubmit && (
						<ButtonElementWidget
							name={this.props.submitButton}
							action={() => {
								this.fireFormSubmitEvent();
							}}
						/>
					)}
					{this.props.showReset && (
						<ButtonElementWidget
							name={this.props.resetButton}
							action={() => {
								this.rootGroup.resetValue();
							}}
						/>
					)}
				</div>
			</form>
		);
	}
}
