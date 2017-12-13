import * as React from "react";
import * as _ from "lodash";
import {
	BaseElementWidget, BaseElementWidgetProps,
	BaseElementWidgetState
} from "./BaseElementWidget";
import {ReactElement} from "react";

export interface FormGroupWidgetProps extends BaseElementWidgetProps<any> {
}

export interface FormGroupWidgetState extends BaseElementWidgetState<any> {
}

/**
 * @author dylanvorster
 */
export class FormGroupWidget extends BaseElementWidget<any, FormGroupWidgetProps, FormGroupWidgetState> {

	protected elements: { [name: string]: BaseElementWidget<any, BaseElementWidgetProps<any>, BaseElementWidgetState<any>> }

	public static defaultProps: BaseElementWidgetProps<any> = {
		name: "",
		value: null,
		allowValueOverride: true
	};

	constructor(props: FormGroupWidgetProps) {
		super("srf-group", props);
		this.elements = {};
	}

	getValue() {
		return _.mapValues(this.elements, (element) => {
			return element.getValue();
		});
	}

	resetValue() {
		_.forEach(this.elements, (element) => {
			element.resetValue();
		});
	}

	bindChildren(children) {
		this.elements = {};
		return React.Children.map(children, (child: ReactElement<BaseElementWidgetProps<any>>) => {

			//string
			if (!React.isValidElement(child)) {
				return child;
			}

			var children = child.props.children;

			//if its not a nested system we must go deeper
			if (child.type !== FormGroupWidget && child.props.children) {
				children = this.bindChildren(child.props.children);
			}

			//bind the children (cant use instance of here because typescript|react is being stupid)
			if ((child.type['__proto__'] as any) === BaseElementWidget) {

				let props: any = {
					ref: (ob) => {
						this.elements[child.props.name] = ob;
					}
				};
				if (this.state.value) {
					props['value'] = this.state.value[child.props.name];
				}

				return React.cloneElement(child, props, children);
			}
			return React.cloneElement(child, null, children);
		});
	}

	render() {
		return (
			<div {...this.getProps()}>
				{this.bindChildren(this.props.children)}
			</div>
		);
	}
}

export var FormGroupWidgetFactory = React.createFactory(FormGroupWidget);
