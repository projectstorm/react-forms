import * as React from "react";
import * as _ from "lodash";
import { BaseElementWidget, BaseElementWidgetProps, BaseElementWidgetState } from "../core/BaseElementWidget";

export interface SelectElementWidgetProps extends BaseElementWidgetProps<string> {
	groups: any;
	defaultGroup?: string;
}

export interface SelectElementWidgetState extends BaseElementWidgetState<string> {
	groups: any;
}

export class SelectElementWidget extends BaseElementWidget<string, SelectElementWidgetProps, SelectElementWidgetState> {
	public static defaultProps: SelectElementWidgetProps = {
		groups: {},
		defaultGroup: "Please select:"
	};

	constructor(props: SelectElementWidgetProps) {
		super("srf-select", props);
		this.state = this.computeNewComponentState(props);
	}

	computeNewComponentState(props): SelectElementWidgetState {
		//compute the new set of options
		let options = this.getOptions(props.groups);

		let value = this.state.value;
		if (value === null || (props.allowValueOverride && props.value !== undefined)) {
			value = props.value;
		}

		//try find the state value in the set
		let foundValue = false;
		let possibleOption = null;
		loop: for (let i in options) {
			for (let j in options[i]) {
				possibleOption = possibleOption || j;
				if (j === value) {
					foundValue = true;
					break loop;
				}
			}
		}

		let newState = {
			value: value,
			resetValue: this.state.resetValue,
			groups: options
		};

		if (!foundValue && possibleOption) {
			newState.value = possibleOption;
			newState.resetValue = possibleOption;
		}

		return newState;
	}

	componentWillReceiveProps(nextProps) {
		this.setState(this.computeNewComponentState(nextProps));
	}

	normlaizeGroup(option) {
		if (_.isArray(option)) {
			return _.mapKeys(option, opt => {
				return opt;
			});
		}
		return option;
	}

	getOptions(groupData: any): { [groupName: string]: { [value: string]: string } } {
		// its just a normal set
		if (_.isArray(groupData)) {
			return {
				[this.props.defaultGroup]: this.normlaizeGroup(groupData)
			};
		}

		let groups = {};
		for (let i in groupData) {
			if (!_.isObject(groupData[i])) {
				if (!groups[this.props.defaultGroup]) {
					groups[this.props.defaultGroup] = {};
				}
				groups[this.props.defaultGroup][i] = this.normlaizeGroup(groupData[i]);
			} else {
				groups[i] = this.normlaizeGroup(groupData[i]);
			}
		}
		return groups;
	}

	render() {
		let props = {
			...this.getProps(),
			onChange: event => {
				this.setValue(event.target.value);
			}
		};

		//only add the value if its valid
		if (this.getValue()) {
			props["value"] = this.getValue();
		}

		return (
			<select {...props}>
				{//render the groups
				_.keys((this.state as SelectElementWidgetState).groups).map(group => {
					return (
						<optgroup label={group} key={group}>
							{//render each option
							_.keys((this.state as SelectElementWidgetState).groups[group]).map(key => {
								return (
									<option value={key} key={key}>
										{(this.state as SelectElementWidgetState).groups[group][key]}
									</option>
								);
							})}
						</optgroup>
					);
				})}
			</select>
		);
	}
}
