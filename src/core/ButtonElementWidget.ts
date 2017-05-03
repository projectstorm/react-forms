import * as React from "react";

export interface ButtonElementWidgetProps{
	name: string;
	action: () => any
}

export interface ButtonElementWidgetState{
}

/**
 * @author dylanvorster
 */
export class ButtonElementWidget extends React.Component<ButtonElementWidgetProps, ButtonElementWidgetState> {

	constructor(props: ButtonElementWidgetProps){
		super(props);
		this.state = {
		}
	}

	render() {
		return React.DOM.input({
			className:"storm-button",
			type:"button",
			value:this.props.name,
			onClick: this.props.action
		});
	}
}

export var ButtonElementWidgetFactory = React.createFactory(ButtonElementWidget);