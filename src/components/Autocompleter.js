var React = require("react");
var Dropdown = require("./Dropdown");
var _uniq = require("lodash/array/uniq");
var _omit = require("lodash/object/omit");
var _pick = require("lodash/object/pick");
var _pull = require("lodash/array/pull");
var _dropRight = require("lodash/array/dropright");
var TextField = require("./TextField");
var ComponentMixin = require("../ComponentMixin");
/**
 * @author Dylan Vorster
 */
module.exports = React.createClass({
	displayName: 'Auto',
	mixins: [ComponentMixin({value:["a"]})],
	getDefaultProps: function(){
		return {
			maxElements: false,
			values: {
				"a":"Dylan",
				"b":"Vorster",
				"c":"Tristan"
			}
		};
	},
	getInitialState: function(){
		return {
			shortlist: this.props.values,
			selected: null,
			dropdownVisible: false
		};
	},
	
	onFocus: function(event){
		this.state.dropdownVisible = true;
		this.setState(this.state);
	},
	
	onKeyPress: function(event){
		
		//enter key
		if(event.keyCode === 13 && this.refs.dropdown){
			this.addToken(this.refs.dropdown.getValue());
		}
		
		//up key
		if(event.keyCode === 38 && this.refs.dropdown){
			this.refs.dropdown.moveUp();
		}
		//down key
		else if(event.keyCode === 40 && this.refs.dropdown){
			this.refs.dropdown.moveDown();
		}
		//backspace
		else if(event.keyCode === 8){
			if(this.refs.field.getValue() === null){
				this.state.value = _dropRight(this.state.value);
				this.state.dropdownVisible = false;
				this.setState(this.state);
			}
		}
	},
	
	addToken: function(value){
		this.state.value.push(value);
		this.state.value = _uniq(this.state.value);
		this.state.dropdownVisible = false;
		this.setState(this.state);
		this.refs.field.setValue("");
	},
	
	buildShortlist: function(value){
		this.state.dropdownVisible = true;
		if(value === null){
			this.state.shortlist = this.props.values;
		}else{
			value = (""+value).toUpperCase().trim();
			this.state.shortlist = _pick(this.props.values, function(val){
				if(React.isValidElement(val)){
					if(val.props.name){
						val = val.props.name;
					}else{
						throw "Missing a name property on autocompleter child";
					}
				}
				if(value == ""){
					return true;
				}
				return val.toUpperCase().search(value) !== -1;
			});
		}
		this.setState(this.state,function(){
			if(this.refs.dropdown){
				this.refs.dropdown.setValue(Object.keys(this.state.shortlist)[0]);
			}
		}.bind(this));
		
	},
	
	render: function(){
		
		children = this.state.value.map(function(value){
			var tokenName = this.props.values[value];
			if(React.isValidElement(tokenName)){
				tokenName = this.props.values[value].props.name;
			}
			
			return React.DOM.div({key:value,className:'token',onClick: function(){
				_pull(this.state.value,value);
				this.setState(this.state);
			}.bind(this)},tokenName);
		}.bind(this));
		
		var shortlist = _omit(this.state.shortlist, this.state.value);
		
		if(this.props.maxElements !== 1 || this.state.value.length !== 1){
			children.push(React.DOM.div({key:'input',className:'input'},

				//only show the dropdown if there are elements
				(this.state.dropdownVisible && Object.keys(shortlist).length > 0)?React.createElement(Dropdown,{
					ref: 'dropdown',
					action: this.addToken,
					children:shortlist
				}):null,
				React.createElement(TextField,{
					ref: 'field',
					onFocus: this.onFocus,
					onBlur: this.onBlur,
					onKeyDown:this.onKeyPress,
					change: this.buildShortlist
				})
			));
		}
		
		return (
			React.DOM.div({
				"data-max-elements":this.props.maxElements,
				className:'storm-autocompleter '
			},children)
		);
	}
});