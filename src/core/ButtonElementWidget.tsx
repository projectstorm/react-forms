import * as React from "react";
import { BaseWidget, BaseWidgetProps } from "@projectstorm/react-core";

export interface ButtonElementWidgetProps extends BaseWidgetProps {
	name: string;
	action: () => any;
}

export interface ButtonElementWidgetState {}

export class ButtonElementWidget extends BaseWidget<ButtonElementWidgetProps, ButtonElementWidgetState> {
	constructor(props: ButtonElementWidgetProps) {
		super("srf-button", props);
		this.state = {};
	}

	render() {
		return <input {...this.getProps()} type="button" value={this.props.name} onClick={this.props.action} />;
	}
}

export var ButtonElementWidgetFactory = React.createFactory(ButtonElementWidget);
