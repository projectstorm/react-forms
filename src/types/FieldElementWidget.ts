import * as React from "react";
import {BaseElementWidget,BaseElementWidgetProps,BaseElementWidgetState} from "../core/BaseElementWidget";

export interface FieldElementWidgetProps extends BaseElementWidgetProps<string>{
	placeholder?: string;
	livetype?: boolean;
}

export interface FieldElementWidgetState extends BaseElementWidgetState<string>{
}

/**
 * @author dylanvorster
 */
export class FieldElementWidget extends BaseElementWidget<string,FieldElementWidgetProps, FieldElementWidgetState> {

	constructor(props: FieldElementWidgetProps){
		super(props);
	}

	render() {

		var livetype = true;
		if(typeof (this.props as FieldElementWidgetProps).livetype === 'boolean'){
			livetype = (this.props as FieldElementWidgetProps).livetype;
		}

		var props = {
			className: "storm-field",
			placeholder: (this.props as FieldElementWidgetProps).placeholder || this.props.label || this.props.name,
			onChange: (event) => {
				this.setValue(event.target.value,livetype);
			}
		};

		if(!livetype){
			props['onKeyPress'] = (event) => {
				if (event.key === 'Enter' && this.props.valueChangedEvent){
					this.props.valueChangedEvent(this.state.value);
				}
			}
		}

		//only add the value if its valid
		if(this.getValue()){
			props['value'] = this.getValue();
		}

		return (
			React.DOM.input(props)
		);
	}
}

export var FieldElementWidgetFactory = React.createFactory(FieldElementWidget);
