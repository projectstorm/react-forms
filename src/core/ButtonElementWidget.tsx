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
		return <input type="button" className="storm-button" value={this.props.name} onClick={ this.props.action}/>
	}
}

export var ButtonElementWidgetFactory = React.createFactory(ButtonElementWidget);