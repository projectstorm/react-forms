import * as React from "react";
import {ButtonElementWidget} from "./ButtonElementWidget";
import {FormGroupWidget, FormGroupWidgetFactory} from "./FormGroupWidget";
import {ReactElement} from "react";
import * as PropTypes from 'prop-types';

export interface FormWidgetProps{
	formSubmitEvent?: (model: any) => any;

	//show buttons?
	showReset?: boolean;
	showSubmit?:boolean;

	//buttons
	submitButton?: string;
	resetButton?: string;

	children?: JSX.Element | JSX.Element[];
}

export interface FormWidgetState{
}

export interface FormContext{
	form: FormWidget;
}

/**
 * @author Dylan Vorster
 */
export class FormWidget extends React.Component<FormWidgetProps, FormWidgetState> {

	rootGroup: FormGroupWidget;

	static childContextTypes = {
		form: PropTypes.any
	}

	public static defaultProps: FormWidgetProps = {
		showReset: true,
		showSubmit: true,
		submitButton:'Submit',
		resetButton: 'Reset'
	};

	constructor(props: FormWidgetProps){
		super(props);
		this.state = {
		}
	}

	fireFormSubmitEvent(action?: (model: any) => any) {
		if(action){
			return action(this.rootGroup.getValue());
		}else{
			return this.props.formSubmitEvent(this.rootGroup.getValue());
		}
	}

	getChildContext(): FormContext {
		return { form: this };
	}

	getChildren(): ReactElement<any>{
		if(React.isValidElement(this.props.children)){
			if(this.props.children.type instanceof FormGroupWidget){
				return React.cloneElement( this.props.children,{
					ref: (element) => {
						this.rootGroup = element;
					}
				});
			}
		}
		return FormGroupWidgetFactory({name:"",ref: (element) => {
			this.rootGroup = element;
		}},this.props.children);
	}

	render() {
		return (
			<form {...this.props} autoComplete="off" className="storm-form">
				{this.getChildren()}
				<div className="storm-form__buttons">
					{
						this.props.showSubmit && <ButtonElementWidget name={this.props.submitButton} action={() => {
							this.fireFormSubmitEvent();
						}}/>
					}
					{
						this.props.showReset && <ButtonElementWidget name={this.props.resetButton} action={() => {
							this.rootGroup.resetValue();
						}}/>
					}
				</div>
			</form>
		);
	}
}

export var FormWidgetFactory = React.createFactory(FormWidget);
