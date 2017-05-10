/// <reference types="react" />
/**
 * @author Dylan Vorster
 */
export * from "./core/BaseElementWidget";
export * from "./core/FormGroupWidget";
export * from "./core/ButtonElementWidget";
export * from "./core/FormWidget";
export * from "./types/FieldElementWidget";
export * from "./layout/TableLayoutWidget";
import { BaseElementWidgetProps } from "./core/BaseElementWidget";
import { FormGroupWidget, FormGroupWidgetProps } from "./core/FormGroupWidget";
import { ButtonElementWidget, ButtonElementWidgetProps } from "./core/ButtonElementWidget";
import { FormWidget, FormWidgetProps } from "./core/FormWidget";
import { TableLayoutWidget, TableLayoutWidgetProps } from "./layout/TableLayoutWidget";
export declare var DOM: {
    table: React.ComponentFactory<TableLayoutWidgetProps, TableLayoutWidget>;
    button: React.ComponentFactory<ButtonElementWidgetProps, ButtonElementWidget>;
    form: React.ComponentFactory<FormWidgetProps, FormWidget>;
    group: React.ComponentFactory<FormGroupWidgetProps, FormGroupWidget>;
    input: React.Factory<BaseElementWidgetProps<string>>;
    select: React.Factory<BaseElementWidgetProps<string>>;
};
