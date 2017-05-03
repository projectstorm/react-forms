import * as React from "react";
import {BaseElementWidget,BaseElementWidgetProps,BaseElementWidgetState} from "../core/BaseElementWidget";

export interface FieldElementWidgetProps extends BaseElementWidgetProps{
}

export interface FieldElementWidgetState extends BaseElementWidgetState{
}

/**
 * @author dylanvorster
 */
export class FieldElementWidget extends BaseElementWidget<FieldElementWidgetProps, FieldElementWidgetState> {

	constructor(props: FieldElementWidgetProps){
		super(props);
	}

	render() {
		var props = {
			className: "field-widget",
			onChange: (event) => {
				this.setValue(event.target.value);
			}
		};

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
