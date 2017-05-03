import * as React from "react";

export interface BaseElementWidgetProps{
	name?: string;
	value?: string|null;
	valueChangedEvent?: (value: string) => any;
	allowValueOverride?: boolean;
	children?:any;
	label?: any;
	displayLabel?: boolean;
}

export interface BaseElementWidgetState{
	value: string|null;
	resetValue: string|null;
}

/**
 * @author Dylan Vorster
 */
export class BaseElementWidget<P,S> extends React.Component<BaseElementWidgetProps, BaseElementWidgetState> {

	public static defaultProps: BaseElementWidgetProps = {
		name: "",
		value: null,
		allowValueOverride: true,
		displayLabel: true
	};

	constructor(props: BaseElementWidgetProps) {
		super(props);
		this.state = {
			value: props.value,
			resetValue: props.value
		}
	}

	/**
	 * Helper method for getting the label for this component
	 * @param props
	 * @returns {any|string}
	 */
	static getLabel(props: BaseElementWidgetProps){
		if(!props.displayLabel){
			return null;
		}
		return props.label || props.name.charAt(0).toUpperCase() + props.name.slice(1);
	}

	getValue(): any{
		return this.state.value;
	}

	resetValue(){
		this.setValue(this.state.resetValue);
	}

	componentWillReceiveProps(prev: BaseElementWidgetProps,next: BaseElementWidgetProps){
		if(this.props.allowValueOverride && next.value){
			this.setState({value: next.value});
		}
	}

	cleanValue(value: any){
		if(value === ""){
			return null;
		}
		if(value === undefined){
			return null;
		}
		return value;
	}

	setValue(value: string|null){
		value = this.cleanValue(value);
		this.setState({value: value},() => {
			if(this.props.valueChangedEvent){
				this.props.valueChangedEvent(value);
			}
		});
	}
}

export var BaseElementWidgetFactory = React.createFactory(BaseElementWidget);
