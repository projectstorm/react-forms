import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { host } from "storybook-host";
import {
	FormWidget,
	TableLayoutWidget,
	FieldElementWidget,
	FormGroupWidget,
	CheckboxElementWidget,
	SelectElementWidget
} from "../src/main";
import { CustomFormWidget } from "./CustomFormWidget";

import "./test.scss";

storiesOf("Elements/Field", module)
	.addDecorator(
		host({
			align: "center middle"
		})
	)
	.add("Simple", () => {
		return <FieldElementWidget name="Name" />;
	})
	.add("With placeholder", () => {
		return <FieldElementWidget name="Name" placeholder="Dylan" />;
	})
	.add("With value", () => {
		return <FieldElementWidget name="Name" placeholder="Dylan" value="Hello" />;
	})
	.add("With change event on enter", () => {
		return <FieldElementWidget valueChangedEvent={action("event")} />;
	})
	.add("With change event on type", () => {
		return <FieldElementWidget livetype={true} valueChangedEvent={action("event")} />;
	})
	.add("As TextArea", () => {
		return (
			<FieldElementWidget textArea={true} value="Test value" />
		)
	})
	.add("As TextArea area with live type", () => {
		return (
			<FieldElementWidget textArea={true} livetype={true} valueChangedEvent={action("event")} value="Test value" />
		)
	});

storiesOf("Elements/Checkbox", module)
	.addDecorator(
		host({
			align: "center middle"
		})
	)
	.add("Simple", () => {
		return <CheckboxElementWidget name="Name" />;
	})
	.add("With selected value", () => {
		return <CheckboxElementWidget name="Name" value={true} />;
	})
	.add("With change event", () => {
		return <CheckboxElementWidget valueChangedEvent={action("changed")} />;
	});

storiesOf("Elements/Select", module)
	.addDecorator(
		host({
			align: "center middle"
		})
	)
	.add("Set", () => {
		return <SelectElementWidget groups={['Apple', 'Peach', 'Lemon']}/>;
	})
	.add("Set with value", () => {
		return <SelectElementWidget groups={['Apple', 'Peach', 'Lemon']} value="Peach" />;
	})
	.add("Set in groups", () => {
		return <SelectElementWidget groups={{"Group 1": ['Apple', 'Peach'], "Group 2": ['Lemon']}} />;
	})
	.add("Set in groups with value", () => {
		return <SelectElementWidget groups={{"Group 1": ['Apple', 'Peach'], "Group 2": ['Lemon']}} value="Lemon" />;
	})
	.add("Map", () => {
		return <SelectElementWidget groups={{'a' : 'Apple', 'b' : 'Peach', 'c': 'Lemon'}} />;
	})
	.add("Map with value", () => {
		return <SelectElementWidget groups={{'a' : 'Apple', 'b' : 'Peach', 'c': 'Lemon'}} value="c" />;
	})
	.add("Map in groups", () => {
		return <SelectElementWidget groups={{"Group 1": {'a' : 'Apple', 'b' : 'Peach'}, "Group 2": {'c': 'Lemon'}}} />;
	})
	.add("Map in groups with value", () => {
		return <SelectElementWidget groups={{"Group 1": {'a' : 'Apple', 'b' : 'Peach'}, "Group 2": {'c': 'Lemon'}}} value="c" />;
	});

storiesOf("Forms", module)
	.addDecorator(
		host({
			align: "center middle"
		})
	)
	.add("Simple Form", () => {
		return (
			<FormWidget formSubmitEvent={action("formSubmitEvent")}>
				<TableLayoutWidget>
					<FieldElementWidget name="Name" />
					<FieldElementWidget name="Surname" />
					<FieldElementWidget textArea={true} name="Lots o text" />
				</TableLayoutWidget>
			</FormWidget>
		);
	})
	.add("Customize Buttons", () => {
		return (
			<FormWidget
				submitButton="Save Form"
				resetButton="custom reset button"
				formSubmitEvent={action("formSubmitEvent")}
			>
				<TableLayoutWidget>
					<FieldElementWidget name="Name" />
					<FieldElementWidget name="Surname" />
				</TableLayoutWidget>
			</FormWidget>
		);
	})
	.add("Custom Buttons", () => {
		return <CustomFormWidget />;
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
		);
	});

storiesOf("Forms/Binded", module)
	.addDecorator(
		host({
			align: "center middle"
		})
	)
	.add("Binded Form", () => {
		return (
			<FormWidget value={{ Name: "Dylan", Surname: "Vorster" }} formSubmitEvent={action("formSubmitEvent")}>
				<TableLayoutWidget>
					<FieldElementWidget name="Name" />
					<FieldElementWidget name="Surname" />
				</TableLayoutWidget>
			</FormWidget>
		);
	})
	.add("Binded Form 2", () => {
		return (
			<FormWidget formSubmitEvent={action("formSubmitEvent")}>
				<FormGroupWidget value={{ Name: "Dylan", Surname: "Vorster" }}>
					<TableLayoutWidget>
						<FieldElementWidget name="Name" />
						<FieldElementWidget name="Surname" />
					</TableLayoutWidget>
				</FormGroupWidget>
			</FormWidget>
		);
	});
