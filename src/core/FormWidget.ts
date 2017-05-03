import * as React from "react";
import {ButtonElementWidgetFactory} from "./ButtonElementWidget";
import {FormGroupWidget, FormGroupWidgetFactory} from "./FormGroupWidget";
import {ReactElement} from "../../../React Diagrams/node_modules/@types/react/index";

export interface FormWidgetProps{
	formSubmitEvent?: (model: any) => any;

	//show buttons?
	showReset?: boolean;
	showSubmit?:boolean;

	//buttons
	submitButton?: string;
	resetButton?: string;

	children?: ReactElement<any>;
}

export interface FormWidgetState{
}

/**
 * @author Dylan Vorster
 */
export class FormWidget extends React.Component<FormWidgetProps, FormWidgetState> {

	rootGroup: FormGroupWidget;

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

	getChildren(): ReactElement<any>{
		if(this.props.children.type instanceof FormGroupWidget){
			return React.cloneElement( this.props.children,{
				ref: (element) => {
					this.rootGroup = element;
				}
			});
		}
		return FormGroupWidgetFactory({name:"",ref: (element) => {
			this.rootGroup = element;
		}},this.props.children);
	}

	render() {
		return (
			React.DOM.form({className: "storm-form"},

				this.getChildren(),

				//render the bittons
				React.DOM.div({className:'buttons'},

					//submit button
					this.props.showSubmit?
						ButtonElementWidgetFactory({name:this.props.submitButton,action:() => {
							this.props.formSubmitEvent(this.rootGroup.getValue());
						}}):null,

					//reset button
					this.props.showReset?
						ButtonElementWidgetFactory({name:this.props.resetButton,action:() => {
							this.rootGroup.resetValue();
						}}):null
				)
			)
		);
	}
}

export var FormWidgetFactory = React.createFactory(FormWidget);
