/**
 * @author Dylan Vorster
 */
export * from "./core/BaseElementWidget";
export * from "./core/FormGroupWidget";
export * from "./core/ButtonElementWidget";
export * from "./core/FormWidget";
export * from "./types/FieldElementWidget";
export * from "./layout/TableLayoutWidget";

import {FormGroupWidgetFactory,FormGroupWidget,FormGroupWidgetState,FormGroupWidgetProps} from "./core/FormGroupWidget";
import {ButtonElementWidgetFactory,ButtonElementWidget,ButtonElementWidgetProps} from "./core/ButtonElementWidget";
import {FormWidgetFactory,FormWidget,FormWidgetProps,FormWidgetState} from "./core/FormWidget";
import {FieldElementWidgetFactory,FieldElementWidget,FieldElementWidgetProps,FieldElementWidgetState} from "./types/FieldElementWidget";
import {TableLayoutWidget,TableLayoutWidgetFactory,TableLayoutWidgetProps,TableLayoutWidgetState} from "./layout/TableLayoutWidget";


//export these as convenience methods
export var DOM = {
	table: TableLayoutWidgetFactory,
	button: ButtonElementWidgetFactory,
	form: FormWidgetFactory,
	group:FormGroupWidgetFactory,
	input: FieldElementWidgetFactory
};