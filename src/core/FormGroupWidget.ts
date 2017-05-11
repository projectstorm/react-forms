import * as React from "react";
import * as _ from "lodash";
import {
	BaseElementWidget, BaseElementWidgetFactory, BaseElementWidgetProps,
	BaseElementWidgetState
} from "./BaseElementWidget";
import {ReactElement} from "react";

export interface FormGroupWidgetProps extends BaseElementWidgetProps<any>{
}

export interface FormGroupWidgetState extends BaseElementWidgetState<any>{
}

/**
 * @author dylanvorster
 */
export class FormGroupWidget extends BaseElementWidget<any,FormGroupWidgetProps, FormGroupWidgetState> {

	protected elements : {[name:string]: BaseElementWidget<any,BaseElementWidgetProps<any>,BaseElementWidgetState<any>>}

	public static defaultProps: BaseElementWidgetProps<any> = {
		name: "",
		value: null,
		allowValueOverride: true
	};

	constructor(props: FormGroupWidgetProps){
		super(props);
		this.elements = {};
	}

	getValue(){
		return _.mapValues(this.elements,(element) => {
			return element.getValue();
		});
	}

	resetValue(){
		_.forEach(this.elements,(element) => {
			element.resetValue();
		});
	}

	bindChildren(children,nestLevel: number= 0){
		this.elements = {};
		return React.Children.map(children, (child: ReactElement<BaseElementWidgetProps<any>>) => {

			//string
			if (!React.isValidElement(child)) {
				return child;
			}

			var children = null;

			//if its not a nested system we must go deeper
			if (child.type !== FormGroupWidget && child.props.children) {
				children = this.bindChildren(child.props.children,nestLevel+1);
			}

			//bind the children (cant use instance of here because typescript|react is being stupid)
			if ((child.type['__proto__'] as any) === BaseElementWidget) {
				return React.cloneElement(child,{
					ref: (ob) => {
						this.elements[child.props.name] = ob;
					}
				},children);

			}
			return React.cloneElement(child,null,children);
		});
	}

	render() {
		return (
			React.DOM.div({className: "group"},
				this.bindChildren(this.props.children)
			)
		);
	}
}

export var FormGroupWidgetFactory = React.createFactory(FormGroupWidget);
