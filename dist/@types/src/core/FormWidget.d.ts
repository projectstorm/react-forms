import * as React from "react";
import { FormGroupWidget } from "./FormGroupWidget";
import { ReactElement } from "react";
import { BaseWidget, BaseWidgetProps } from "@projectstorm/react-core";
export interface FormWidgetProps extends BaseWidgetProps {
    formSubmitEvent?: (model: any) => any;
    showReset?: boolean;
    showSubmit?: boolean;
    submitButton?: string;
    resetButton?: string;
    children?: JSX.Element | JSX.Element[];
    value?: any;
}
export interface FormWidgetState {
}
export interface FormContext {
    form: FormWidget;
}
/**
 * @author Dylan Vorster
 */
export declare class FormWidget extends BaseWidget<FormWidgetProps, FormWidgetState> {
    rootGroup: FormGroupWidget;
    static childContextTypes: {
        form: any;
    };
    static defaultProps: FormWidgetProps;
    constructor(props: FormWidgetProps);
    fireFormSubmitEvent(action?: (model: any) => any): any;
    getChildContext(): FormContext;
    getChildren(): ReactElement<any>;
    render(): JSX.Element;
}
export declare var FormWidgetFactory: React.ComponentFactory<Readonly<{
    children?: React.ReactNode;
}> & Readonly<FormWidgetProps>, FormWidget>;
