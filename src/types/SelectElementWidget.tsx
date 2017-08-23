import * as React from "react";
import * as _ from "lodash";
import {BaseElementWidget, BaseElementWidgetProps, BaseElementWidgetState} from "../core/BaseElementWidget";

export interface SelectElementWidgetProps extends BaseElementWidgetProps<string>{
	groups: any;
	defaultGroup?: string;
}

export interface SelectElementWidgetState extends BaseElementWidgetState<string>{
	groups: any;
}

/**
 * @author dylanvorster
 */
export class SelectElementWidget  extends BaseElementWidget<string,SelectElementWidgetProps, SelectElementWidgetState>  {

	public static defaultProps: SelectElementWidgetProps = {
		groups: {},
		defaultGroup:'Please select:'
	};

	constructor(props: SelectElementWidgetProps){
		super(props);
		this.state = this.computeNewComponentState(props);
	}

	computeNewComponentState(props): SelectElementWidgetState{
		//compute the new set of options
		let options = this.getOptions(props.groups);

		//try find the state value in the set
		let foundValue = false;
		let possibleOption = null;
		loop:
		for(let i in this.props.groups){
			for(let j in this.props.groups[i]){
				possibleOption =  possibleOption || j;
				if(j === this.state.value){
					foundValue = true;
					break loop;
				}
			}
		}

		let newState = {
			value: this.state.value,
			resetValue: this.state.resetValue,
			groups: options
		};

		if(!foundValue && possibleOption){
			newState.value = possibleOption;
			newState.resetValue = possibleOption;
		}

		return newState;
	}

	componentWillReceiveProps(nextProps){
		this.setState(this.computeNewComponentState(nextProps));
	}

	getOptions(groupData: any): {[groupName: string]: {[value: string]: string}}{
		let groups = {};
		for(let i in groupData){
			if(!_.isObject(groupData[i])){
				if(!groups[this.props.defaultGroup]){
					groups[this.props.defaultGroup] = {};
				}
				groups[this.props.defaultGroup][i] = groupData[i];
			}else{
				groups[i] = groupData[i];
			}
		}
		return groups;
	}

	render() {
		var props = {
			className: "storm-select",
			onChange: (event) => {
				this.setValue(event.target.value);
			}
		};

		//only add the value if its valid
		if(this.getValue()){
			props['value'] = this.getValue();
		}

		return (
			<select {...props}>
				{
					//render the groups
					_.keys((this.state as SelectElementWidgetState).groups).map((group) => {
						return (
							<optgroup label={group} key={group}>
								{
									//render each option
									_.keys((this.state as SelectElementWidgetState).groups[group]).map((key) => {
										return (
											<option value={key} key={key}>{(this.state as SelectElementWidgetState).groups[group][key]}</option>
										);
									})
								}
							</optgroup>
						);
					})
				}
			</select>
		);
	}
}

export var SelectElementWidgetFactory = React.createFactory(SelectElementWidget);