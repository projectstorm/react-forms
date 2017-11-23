import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import {host} from 'storybook-host';
import {
	FormWidget,
	TableLayoutWidget,
	FieldElementWidget,
	FormGroupWidget,
	CheckboxElementWidget,
	SelectElementWidget
} from "../src/main";
import {CustomFormWidget} from "./CustomFormWidget";

require("./test.scss");


storiesOf("Elements", module)
	.addDecorator(host({
		align: 'center middle',
	}))
	.add("Field", () => {
		return (
			<FieldElementWidget name="Name" />
		)
	})
	.add("Field with placeholder", () => {
		return (
			<FieldElementWidget name="Name" placeholder="Dylan" />
		)
	})
	.add("Field with value", () => {
		return (
			<FieldElementWidget name="Name" placeholder="Dylan" value="Hello" />
		)
	})
	.add("Field change event on enter", () => {
		return (
			<FieldElementWidget valueChangedEvent={action("event")} />
		)
	})
	.add("Field change event on type", () => {
		return (
			<FieldElementWidget livetype={true} valueChangedEvent={action("event")} />
		)
	})
	.add("Checkbox", () => {
		return (
			<CheckboxElementWidget name="Name" />
		)
	})
	.add("Checkbox selected", () => {
		return (
			<CheckboxElementWidget name="Name" value={true} />
		)
	})
	.add("Checkbox change event", () => {
		return (
			<CheckboxElementWidget valueChangedEvent={action('changed')} />
		)
	})
	.add("Select", () => {
		return (
			<SelectElementWidget groups={{"1": "item 1", "2": "item 2"}} valueChangedEvent={action('changed')} />
		)
	})
	.add("Select with groups", () => {
		return (
			<SelectElementWidget groups={{group1:{"1": "item 1", "2": "item 2"}, group2: {"3": "item 3"}}} valueChangedEvent={action('changed')} />
		)
	})
	.add("Select with value", () => {
		return (
			<SelectElementWidget groups={{group1:{"1": "item 1", "2": "item 2"}, group2: {"3": "item 3"}}} value={"2"} />
		)
	})


storiesOf("Forms", module)
	.addDecorator(host({
		align: 'center middle',
	}))
	.add("Simple Form", () => {
		return (
            <FormWidget formSubmitEvent={action("formSubmitEvent")}>
                <TableLayoutWidget>
                    <FieldElementWidget name="Name" />
                    <FieldElementWidget name="Surname" />
                </TableLayoutWidget>
            </FormWidget>
        )
	})
	.add("Customize Buttons", () => {
		return (
			<FormWidget submitButton="Save Form" resetButton="custom reset button" formSubmitEvent={action("formSubmitEvent")}>
				<TableLayoutWidget>
					<FieldElementWidget name="Name" />
					<FieldElementWidget name="Surname" />
				</TableLayoutWidget>
			</FormWidget>
		)
	})
	.add("Custom Buttons", () => {
		return (
			<CustomFormWidget />
		)
	})
	.add("Simple Form with nested groups", () => {
		return (
			<FormWidget formSubmitEvent={action("formSubmitEvent")}>
				<TableLayoutWidget>
					<FieldElementWidget name="Name" />
					<FieldElementWidget name="Surname" />
					<FormGroupWidget name="group1">
						<FieldElementWidget name="Nested Name" />
					</FormGroupWidget>
				</TableLayoutWidget>
			</FormWidget>
		)
	})

storiesOf("Binded Forms", module)
	.addDecorator(host({
		align: 'center middle',
	}))
	.add("Binded Form", () => {
		return (
			<FormWidget value={{Name: "Dylan", Surname: "Vorster"}} formSubmitEvent={action("formSubmitEvent")}>
				<TableLayoutWidget>
					<FieldElementWidget name="Name" />
					<FieldElementWidget name="Surname" />
				</TableLayoutWidget>
			</FormWidget>
		)
	})
	.add("Binded Form 2", () => {
		return (
			<FormWidget formSubmitEvent={action("formSubmitEvent")}>
				<FormGroupWidget value={{Name: "Dylan", Surname: "Vorster"}}>
					<TableLayoutWidget>
						<FieldElementWidget name="Name" />
						<FieldElementWidget name="Surname" />
					</TableLayoutWidget>
				</FormGroupWidget>
			</FormWidget>
		)
	});
