import * as React from "react";
import * as _ from "lodash";
import * as PropTypes from 'prop-types';
import {BaseElementWidget,BaseElementWidgetProps,BaseElementWidgetState} from "../core/BaseElementWidget";
import {FormContext} from "../core/FormWidget";

export interface FieldElementWidgetProps extends BaseElementWidgetProps<string>{
	placeholder?: string;
	livetype?: boolean;
	submitOnEnter?: boolean;
	type?: string;
}

export interface FieldElementWidgetState extends BaseElementWidgetState<string>{
}



/**
 * @author dylanvorster
 */
export class FieldElementWidget extends BaseElementWidget<string,FieldElementWidgetProps, FieldElementWidgetState> {

	context: FormContext;

	static contextTypes = {
		form: PropTypes.any
	}

	public static defaultProps: FieldElementWidgetProps = _.extend(BaseElementWidget.defaultProps,{
		submitOnEnter: false,
		livetype: false,
	}) ;


	constructor(props: FieldElementWidgetProps){
		super(props);
	}

	filterOutProps(props: string[]){
		var filteredProps = {};
		for(var i in this.props){
			if(props.indexOf(i) === -1){
				filteredProps[i] = this.props[i];
			}
		}
		return filteredProps;
	}

	render() {

		var props = {
			... this.filterOutProps(['submitOnEnter','livetype','valueChangedEvent','allowValueOverride','displayLabel']),

			className: "storm-field",
			placeholder: (this.props as FieldElementWidgetProps).placeholder || this.props.label || this.props.name,
			onChange: (event) => {
				this.setValue(event.target.value,this.props.livetype);
			}
		};

		props['onKeyPress'] = (event) => {
			if (event.key === 'Enter'){

				//dont reload the page
				event.preventDefault();

				//livetype
				if(this.props.livetype && this.props.valueChangedEvent){
					this.props.valueChangedEvent(this.state.value);
				}

				//enter button is used to submit form
				if(this.props.submitOnEnter && this.context.form){
					this.context.form.fireFormSubmitEvent();
				}
			}
		}

		//only add the value if its valid
		if(this.getValue()){
			props['value'] = this.getValue();
		}else{
			props['value'] = "";
		}

		return (
			<input {...props} />
		);
	}
}

export var FieldElementWidgetFactory = React.createFactory(FieldElementWidget);
