import * as React from "react";
import { BaseElementWidget, BaseElementWidgetProps, BaseElementWidgetState } from "../core/BaseElementWidget";
import { FormContext } from "../core/FormWidget";
export interface FieldElementWidgetProps extends BaseElementWidgetProps<string> {
    placeholder?: string;
    livetype?: boolean;
    submitOnEnter?: boolean;
    type?: string;
    autoComplete?: any;
    textArea?: boolean;
}
export interface FieldElementWidgetState extends BaseElementWidgetState<string> {
}
export declare class FieldElementWidget extends BaseElementWidget<string, FieldElementWidgetProps, FieldElementWidgetState> {
    context: FormContext;
    static contextTypes: {
        form: any;
    };
    static defaultProps: FieldElementWidgetProps;
    constructor(props: FieldElementWidgetProps);
    render(): JSX.Element;
}
export declare var FieldElementWidgetFactory: React.ComponentFactory<FieldElementWidgetProps, FieldElementWidget>;
