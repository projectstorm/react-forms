import * as React from "react";

export interface BaseElementWidgetProps<Type>{
	name?: any;
	value?: Type|null;
	valueChangedEvent?: (value: Type) => any;
	allowValueOverride?: boolean;
	children?:any;
	label?: any;
	displayLabel?: boolean;
}

export interface BaseElementWidgetState<Type>{
	value: Type|null;
	resetValue: Type|null;
}

/**
 * @author Dylan Vorster
 */
export class BaseElementWidget<Type,P extends BaseElementWidgetProps<Type>,S extends BaseElementWidgetState<Type>> extends React.Component<P, BaseElementWidgetState<Type>> {

	public static defaultProps: BaseElementWidgetProps<any> = {
		name: "",
		value: null,
		allowValueOverride: true,
		displayLabel: true
	};

	constructor(props: P) {
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
	static getLabel(props: BaseElementWidgetProps<any>){
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

	componentWillReceiveProps(prev,next){
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

	setValue(value: Type|null, fireEvent: boolean = true){
		value = this.cleanValue(value);
		this.setState({value: value},() => {
			if(fireEvent && this.props.valueChangedEvent){
				this.props.valueChangedEvent(value);
			}
		});
	}
}

export var BaseElementWidgetFactory = React.createFactory(BaseElementWidget);
