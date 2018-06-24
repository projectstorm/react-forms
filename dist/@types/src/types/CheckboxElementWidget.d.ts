import * as React from "react";
import { BaseElementWidget, BaseElementWidgetProps, BaseElementWidgetState } from "../core/BaseElementWidget";
import { FormContext } from "../core/FormWidget";
export interface CheckboxElementWidgetProps extends BaseElementWidgetProps<boolean> {
}
export interface CheckboxElementWidgetState extends BaseElementWidgetState<boolean> {
}
export declare class CheckboxElementWidget extends BaseElementWidget<boolean, CheckboxElementWidgetProps, CheckboxElementWidgetState> {
    context: FormContext;
    static contextTypes: {
        form: any;
    };
    constructor(props: CheckboxElementWidgetProps);
    render(): JSX.Element;
}
export declare var CheckboxElementWidgetFactory: React.ComponentFactory<CheckboxElementWidgetProps, CheckboxElementWidget>;
