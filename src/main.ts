/**
 * @author Dylan Vorster
 */
export * from "./core/BaseElementWidget";
export * from "./core/FormGroupWidget";
export * from "./core/ButtonElementWidget";
export * from "./core/FormWidget";
export * from "./types/FieldElementWidget";
export * from "./types/SelectElementWidget";
export * from "./types/CheckboxElementWidget";
export * from "./layout/TableLayoutWidget";

import {FormGroupWidgetFactory,FormGroupWidget,FormGroupWidgetState,FormGroupWidgetProps} from "./core/FormGroupWidget";
import {ButtonElementWidgetFactory,ButtonElementWidget,ButtonElementWidgetProps} from "./core/ButtonElementWidget";
import {FormWidgetFactory,FormWidget,FormWidgetProps,FormWidgetState} from "./core/FormWidget";
import {FieldElementWidgetFactory,FieldElementWidget,FieldElementWidgetProps,FieldElementWidgetState} from "./types/FieldElementWidget";
import {SelectElementWidget,SelectElementWidgetFactory,SelectElementWidgetProps,SelectElementWidgetState} from "./types/SelectElementWidget";
import {TableLayoutWidget,TableLayoutWidgetFactory,TableLayoutWidgetProps,TableLayoutWidgetState} from "./layout/TableLayoutWidget";
import {CheckboxElementWidgetFactory,CheckboxElementWidget,CheckboxElementWidgetProps,CheckboxElementWidgetState} from "./types/CheckboxElementWidget";


//export these as convenience methods
export var DOM = {
	table: TableLayoutWidgetFactory,
	button: ButtonElementWidgetFactory,
	form: FormWidgetFactory,
	group:FormGroupWidgetFactory,
	input: FieldElementWidgetFactory,
	select: SelectElementWidgetFactory,
	checkbox: CheckboxElementWidgetFactory
};
