import * as React from "react";
import { BaseWidget, BaseWidgetProps } from "@projectstorm/react-core";
export interface TableLayoutWidgetProps extends BaseWidgetProps {
}
export interface TableLayoutWidgetState {
}
export declare class TableLayoutWidget extends BaseWidget<TableLayoutWidgetProps, TableLayoutWidgetState> {
    constructor(props: TableLayoutWidgetProps);
    render(): JSX.Element;
}
export declare var TableLayoutWidgetFactory: React.ComponentFactory<TableLayoutWidgetProps, TableLayoutWidget>;
