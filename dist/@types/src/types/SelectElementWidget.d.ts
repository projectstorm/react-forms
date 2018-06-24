import * as React from "react";
import { BaseElementWidget, BaseElementWidgetProps, BaseElementWidgetState } from "../core/BaseElementWidget";
export interface SelectElementWidgetProps extends BaseElementWidgetProps<string> {
    groups: any;
    defaultGroup?: string;
}
export interface SelectElementWidgetState extends BaseElementWidgetState<string> {
    groups: any;
}
export declare class SelectElementWidget extends BaseElementWidget<string, SelectElementWidgetProps, SelectElementWidgetState> {
    static defaultProps: SelectElementWidgetProps;
    constructor(props: SelectElementWidgetProps);
    computeNewComponentState(props: any): SelectElementWidgetState;
    componentWillReceiveProps(nextProps: any): void;
    normlaizeGroup(option: any): any;
    getOptions(groupData: any): {
        [groupName: string]: {
            [value: string]: string;
        };
    };
    render(): JSX.Element;
}
export declare var SelectElementWidgetFactory: React.ComponentFactory<SelectElementWidgetProps, SelectElementWidget>;
