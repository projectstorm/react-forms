var React = require("react");
var _foreach = require("lodash/collection/foreach");
/**
 * @author Dylan Vorster
 */
module.exports = {
	
	compileElement: function(key,value){
		var TextField = require("./components/TextField");
		var Group = require("./components/Group");
		
		//already a react element
		if(React.isValidElement(value)){
			return value;
		}
		
		//a group
		else if(typeof value === 'object'){
			return React.createElement(Group,{name:key},this.compile(value));
		}
		
		//a standard component
		else if(typeof value === 'string'){
			
			var name = value;
			var label = null;
			if(typeof key === 'string'){
				name = key;
				label = value;
			}
			
			var props = {
				name: name
			};
			if(label){
				props.label = label;
			}
			
			//var regex = /([!#])/g;
			return React.createElement(TextField,props);
		}
		
		//not valid
		else{
			throw "Could not compile element: "+value;
		}
	},
	
	generateLabel: function(props){
		if(React.isValidElement(props.label)){
			return props.label;
		}
		if(props.label){
			return React.DOM.label({className:'storm-label'},props.label);
		}
		if(props.name){
			return React.DOM.label({className:'storm-label'},props.name);
		}
		return null;
	},
	
	compile: function(data){
		var Table = require("./components/Table");
		if(typeof data !== 'object'){
			data = [data];
		}
		var newElements = [];
		_foreach(data,function(value,key){
			newElements.push(this.compileElement(key,value));
		}.bind(this));
		return React.createElement(Table,{},newElements);
	},
	
	validateEmail: function(email) {
		var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	},
	
	fireCallback: function(cb, args ){
		if(Array.isArray(cb)){
			cb.forEach(function(temp){
				if(typeof cb !== 'function'){
					throw "One of the callbacks in the array is not a function";
				}
				temp(args);
			});
		}
		else if(typeof cb === 'function'){
			cb(args);
		}else if(cb){
			throw "Callback is not a function";
		}
	}
	
};