import * as React from "react";
import * as _ from "lodash";
import { BaseElementWidget, BaseElementWidgetProps, BaseElementWidgetState } from "./BaseElementWidget";
export interface FormGroupWidgetProps extends BaseElementWidgetProps<any> {
}
export interface FormGroupWidgetState extends BaseElementWidgetState<any> {
}
export declare class FormGroupWidget extends BaseElementWidget<any, FormGroupWidgetProps, FormGroupWidgetState> {
    protected elements: {
        [name: string]: BaseElementWidget<any, BaseElementWidgetProps<any>, BaseElementWidgetState<any>>;
    };
    static defaultProps: BaseElementWidgetProps<any>;
    constructor(props: FormGroupWidgetProps);
    getValue(): _.Dictionary<any>;
    resetValue(): void;
    bindChildren(children: any): React.ReactElement<BaseElementWidgetProps<any>>[];
    render(): JSX.Element;
}
export declare var FormGroupWidgetFactory: React.ComponentFactory<FormGroupWidgetProps, FormGroupWidget>;
