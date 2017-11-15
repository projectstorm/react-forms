import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { FormWidget, TableLayoutWidget, FieldElementWidget } from "../src/main";

require("./test.scss");

storiesOf("Forms", module)
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