import * as React from "react";
import { BaseWidget, BaseWidgetProps } from "@projectstorm/react-core";
export interface ButtonElementWidgetProps extends BaseWidgetProps {
    name: string;
    action: () => any;
}
export interface ButtonElementWidgetState {
}
export declare class ButtonElementWidget extends BaseWidget<ButtonElementWidgetProps, ButtonElementWidgetState> {
    constructor(props: ButtonElementWidgetProps);
    render(): JSX.Element;
}
export declare var ButtonElementWidgetFactory: React.ComponentFactory<ButtonElementWidgetProps, ButtonElementWidget>;
