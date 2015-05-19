var React = require("react");
/**
 * @author Dylan Vorster
 */
module.exports = React.createClass({
	displayName: "Auto",
	getDefaultProps: function(){
		return {
			onChange: function(){
				
			},
			tokens: [],
			options: []
		};
	},
	getInitialState: function(){
		return {
			selected: 0,
			value: '',
			dropdownVisible: false,
			shortlist: []
		};
	},
	getValue : function(){
		
	},
	
	buildShortlist: function(){
		var shortlist = [];
		this.props.options.forEach(function(element,index){
			var data = element;
			var value = index;
			if(typeof element !== 'string'){
				data = ''+element.title;
			}

			//do we display this element
			if(data.slice(0, this.state.value.length) !== this.state.value){
				return false;
			}
			shortlist.push({value:value,name: data});
		}.bind(this));
		
		return shortlist;
	},
	onKeyPress: function(event){
		
		//enter key
		if(event.keyCode === 13){
			
		}
		
		//up key
		if(event.keyCode === 38){
			this.state.selected--;
			if(this.state.selected < 0){
				this.state.selected = this.props.options.length-1;
			}
			this.setState(this.state);
		}
		//down key
		else if(event.keyCode === 40){
			this.state.selected++;
			if(this.state.selected > this.props.options.length -1){
				this.state.selected = 0;
			}
			this.setState(this.state);
		}
	},
	onKeyUp: function(event){
		this.state.value = event.target.value;
		this.state.shortlist = this.buildShortlist();
		
		if(this.state.selected >= this.state.shortlist.length){
			this.state.selected = this.state.shortlist.length-1;
			if(this.state.selected < 0){
				this.state.selected = 0;
			}
		}
		this.setState(this.state);
	},
	onFocus: function(event){
		this.state.dropdownVisible = true;
		this.setState(this.state);
	},
	onBlur: function(event){
		this.state.dropdownVisible = false;
		this.setState(this.state);
	},
	
	render: function(){
		
		var finalChildren = [];
		
		//selected tokens
		this.props.tokens.forEach(function(token){
			finalChildren.push(React.createElement('div',{className:'token'},token));
		});
		
		//dropdown of options
		var children = [];
		var options = [];
		this.state.shortlist.forEach(function(option,index){
			options.push(React.createElement('li',{className:this.state.selected === index?'selected':''},option.name));
		}.bind(this));
		children.push(React.createElement('ul',{style: {visibility: (options.length !== 0 && this.state.dropdownVisible)?'visible':'hidden'}},options));
		
		//input field
		children.push(React.createElement('input',{
			type: "text",
			onKeyDown:this.onKeyPress,
			onKeyUp: this.onKeyUp,
			onFocus: this.onFocus,
			onBlur: this.onBlur
		}));
		
		finalChildren.push(React.createElement('div',null,children));
		return React.createElement('div',{className:'storm-auto'},finalChildren);
	},

});