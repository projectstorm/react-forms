import * as React from "react";
import { action } from "@storybook/addon-actions";
import {
	FormWidget,
	TableLayoutWidget,
	FieldElementWidget,
	FormGroupWidget,
	CheckboxElementWidget
} from "../src/main";

export interface FormContext {
	form: FormWidget;
}

/**
 * @author Dylan Vorster
 */
export class CustomFormWidget extends React.Component<any, any> {

    formRef: FormWidget;

	render() {
		return (
			<div>
                <FormWidget showReset={false} showSubmit={false} formSubmitEvent={action('formSubmitAction')} ref={ref => this.formRef = ref}>
                    <TableLayoutWidget>
                        <FieldElementWidget name="Name" />
                        <FieldElementWidget name="Surname" />
                    </TableLayoutWidget>
                </FormWidget>
                <p>My buttons are decoupled:</p>
                <br/>
                <br/>
                <div onClick={() => {
                    // will fire the formSubmitEvent on the form
                    this.formRef.fireFormSubmitEvent();

                    // you can also do this:
                    // this.formRef.fireFormSubmitEvent((model) => {

                    // });
                }} style={{background: 'gray', padding: 10}}>Click me to save!</div>
            </div>
		);
	}
}
