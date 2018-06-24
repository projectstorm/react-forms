import { BaseWidget, BaseWidgetProps } from "@projectstorm/react-core";
export interface BaseElementWidgetProps<Type> extends BaseWidgetProps {
    name?: any;
    value?: Type | null;
    valueChangedEvent?: (value: Type) => any;
    allowValueOverride?: boolean;
    children?: any;
    label?: any;
    displayLabel?: boolean;
}
export interface BaseElementWidgetState<Type> {
    value: Type | null;
    resetValue: Type | null;
}
export declare class BaseElementWidget<Type, P extends BaseElementWidgetProps<Type>, S extends BaseElementWidgetState<Type>> extends BaseWidget<P, S> {
    static defaultProps: BaseElementWidgetProps<any>;
    state: S;
    constructor(name: string, props: P);
    /**
     * Helper method for getting the label for this component
     * @param props
     * @returns {any|string}
     */
    static getLabel(props: BaseElementWidgetProps<any>): any;
    getValue(): any;
    resetValue(): void;
    componentWillReceiveProps(next: P): void;
    cleanValue(value: any): any;
    setValue(value: Type | null, fireEvent?: boolean, additionalState?: any): void;
}
