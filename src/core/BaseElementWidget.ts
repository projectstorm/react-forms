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
export class BaseElementWidget<Type,P extends BaseElementWidgetProps<Type>,S extends BaseElementWidgetState<Type>> extends React.Component<P, S> {

	public static defaultProps: BaseElementWidgetProps<any> = {
		name: "",
		allowValueOverride: true,
		displayLabel: true
	};

	state: S;

	constructor(props: P) {
		super(props);
		(this.state as any) = {
			value: props.value || null,
			resetValue: props.value || null
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

	componentWillReceiveProps(next){
		if(this.props.allowValueOverride && next.value !== undefined){
			this.setValue(next.value,false);
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

	setValue(value: Type|null, fireEvent: boolean = true, additionalState: any = {}){
		value = this.cleanValue(value);
		this.setState({...additionalState, value: value},() => {
			if(fireEvent && this.props.valueChangedEvent){
				this.props.valueChangedEvent(value);
			}
		});
	}
}

export var BaseElementWidgetFactory = React.createFactory(BaseElementWidget);
