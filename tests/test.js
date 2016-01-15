var SF = require("..");
var React = require("react");
var ReactDOM = require("react-dom");

require("./test.scss");

var DemoBlock = React.createFactory(React.createClass({
	
	getInitialState: function(){
		return {
			logs: "",
			object: this.props.content({log:function(data){
				this.setState({logs:data+"\n" +this.state.logs});
			}.bind(this)})
		};
	},
	
	render: function(){
		return (
			React.DOM.div({className:"demoblock",key: this.props.name},
				React.DOM.div({className:'name'},this.props.name),
				React.DOM.div({className:'content',key:"content"},this.state.object),
				React.DOM.pre({className:'logs'},this.state.logs)
			)
		);
	}
}));


window.onload = function(){
	
	
	ReactDOM.render(React.DOM.div({className: "demo"},
	
		//!------------------------------
	
		React.DOM.h1({},"Text Field"),
		DemoBlock({name: "Text Field",content: function(console){
			return SF.DOM.textfield({placeholder: "Placeholder"});
		}}),
			
		DemoBlock({name: "Text Field Type:Date",content: function(console){
			return SF.DOM.textfield({type: "number"});
		}}),
			
		DemoBlock({name: "Text Field with value",content: function(console){
			return SF.DOM.textfield({value: "test"});
		}}),
			
		DemoBlock({name: "Text Field with change",content: function(console){
			return SF.DOM.textfield({change: function(value){
				console.log(value);
			}});
		}}),
		
		DemoBlock({name: "Text Field with set value",content: function(console){
		
			return React.createElement(React.createClass({
				getInitialState: function(){
					return {
						value: null,
					};
				},
				render: function(){
					return (
						React.DOM.div({},
							SF.DOM.textfield({value: this.state.value}),
							React.DOM.br(),
							SF.DOM.button({name: "Set '45'",action:function(){
								this.setState({value: "45"});
							}.bind(this)})
						)
					);
				}
			}));
		}}),
	
		//!------------------------------
		
		React.DOM.h1({},"Text Area"),
		DemoBlock({name: "TextArea Field",content: function(console){
			return SF.DOM.textarea({placeholder: "Placeholder",rows:5});
		}}),
			
		DemoBlock({name: "TextArea with value",content: function(console){
			return SF.DOM.textarea({value: "test"});
		}}),
			
		DemoBlock({name: "TextArea with change",content: function(console){
			return SF.DOM.textarea({change: function(value){
				console.log(value);
			}});
		}}),
		
		DemoBlock({name: "TextArea Field with set value",content: function(console){
		
			return React.createElement(React.createClass({
				getInitialState: function(){
					return {
						value: null,
					};
				},
				render: function(){
					return (
						React.DOM.div({},
							SF.DOM.textarea({value: this.state.value}),
							React.DOM.br(),
							SF.DOM.button({name: "Set '45'",action:function(){
								this.setState({value: "45"});
							}.bind(this)})
						)
					);
				}
			}))
		}}),
	
		//!------------------------------
		
		React.DOM.h1({},"Checkbox"),
		DemoBlock({name: "Checkbox Field",content: function(console){
			return SF.DOM.checkbox();
		}}),
			
		DemoBlock({name: "Checkbox Field with value",content: function(console){
			return SF.DOM.checkbox({value: true});
		}}),
			
		DemoBlock({name: "Checkbox Field with change",content: function(console){
			return SF.DOM.checkbox({change: function(value){
				console.log(value);
			}});
		}}),
		
		DemoBlock({name: "Checkbox Field with set value",content: function(console){
		
			return React.createElement(React.createClass({
				getInitialState: function(){
					return {
						value: false
					};
				},
				render: function(){
					return (
						React.DOM.div({},
							SF.DOM.checkbox({value: this.state.value}),
							React.DOM.br(),
							SF.DOM.button({name: "Set 'true'",action:function(){
								this.setState({value: true});
							}.bind(this)})
						)
					);
				}
			}));
		}}),
	
		//!------------------------------
	
		React.DOM.h1({},"Selects"),
		DemoBlock({name: "Standard Select",content: function(console){
			return SF.DOM.select({groups:{"Apples":{0:"green",1:"red"}}});
		}}),
		DemoBlock({name: "Select with value",content: function(console){
			return SF.DOM.select({value: 1,groups:{"Apples":{0:"green",1:"red"}}});
		}}),
		DemoBlock({name: "Select with change",content: function(console){
			return SF.DOM.select({value: 1,groups:{"Apples":{0:"green",1:"red"}},change: function(value){
				console.log(value);
			}});
		}}),
		DemoBlock({name: "Set with change",content: function(console){
			return SF.DOM.set({value: 1,values:['Apple',"Orange"],change: function(value){
				console.log(value);
			}});
		}}),
	
		DemoBlock({name: "Select with set value",content: function(console){
		
			return React.createElement(React.createClass({
				getInitialState: function(){
					return {
						value: null
					};
				},
				render: function(){
					return (
						React.DOM.div({},
							SF.DOM.select({groups:{"Apples":{0:"green",1:"red"}},value: this.state.value}),
							React.DOM.br(),
							SF.DOM.button({name: "Set 'red'",action:function(){
								this.setState({value: 1});
							}.bind(this)})
						)
					);
				}
			}));
		}}),
	
		DemoBlock({name: "Set with set value",content: function(console){
		
			return React.createElement(React.createClass({
				getInitialState: function(){
					return {
						value: null
					};
				},
				render: function(){
					return (
						React.DOM.div({},
							SF.DOM.set({values:['Apple',"Orange"],value: this.state.value}),
							React.DOM.br(),
							SF.DOM.button({name: "Set 'Orange'",action:function(){
								this.setState({value: "Orange"});
							}.bind(this)})
						)
					);
				}
			}));
		}}),
	
	
		//!------------------------------
		
		
		React.DOM.h1({},"Lists"),
		DemoBlock({name: "keylist with change",content: function(console){
			return SF.DOM.keylist({value: ["0"],values:{0:'Apple',1:"Orange"},change: function(value){
				console.log(value);
			}});
		}}),
		DemoBlock({name: "list with change",content: function(console){
			return SF.DOM.list({value: ["Red"],values:["Red","Yellow"],change: function(value){
				console.log(value);
			}});
		}}),
		
		//!------------------------------
		
		React.DOM.h1({},"Auto"),
		DemoBlock({name: "dropdown",content: function(console){
			return SF.DOM.dropdown({action: function(value){
				console.log(value);
			}});
		}}),
		DemoBlock({name: "autocompleter",content: function(console){
			return SF.DOM.autocompleter({action: function(value){
				console.log(value);
			}});
		}}),
		DemoBlock({name: "autocompleter with max",content: function(console){
			return SF.DOM.autocompleter({maxElements: 1,action: function(value){
				console.log(value);
			}});
		}}),
		DemoBlock({name: "autocompleter with custom blocks",content: function(console){
			return SF.DOM.autocompleter({
				values: {
					"a":"a",
					"b":"b",
					"c":React.DOM.i({name:"Italic Test",style: {opacity: 0.5}},'Italic Test')
				},
				action: function(value){
					console.log(value);
				}
			});
		}}),
	
	
		React.DOM.h1({},"Errors"),
		
		DemoBlock({name: "Text Field Error",content: function(console){
			return SF.DOM.errorcomponent({
				error: "im an error",
			},SF.DOM.textfield({
				placeholder: "Placeholder",
				change: function(value){
					console.log("raw:" + value);
				}
			}));
		}}),
	
		DemoBlock({name: "Validate: 'test'",content: function(console2){
				
			return React.createElement(React.createClass({
				getInitialState: function(){
					return {
						value: null
					};
				},
				render: function(){
					return (
						React.DOM.div({},
							SF.DOM.validationcomponent({
								value: this.state.value,
								validate: function(value){
									return value === 'test';
								},
								change: function(value){
									console.log("valid:" + value);
								}
							},SF.DOM.textfield({
								placeholder: "Placeholder",
								change: function(value){
									console.log("raw:" + value);
								}
							})),
							
							React.DOM.br(),
							SF.DOM.button({name: "Set 'test'",action:function(){
								this.setState({value: "test"});
							}.bind(this)})
						)
					);
				}
			}));
				
		}}),
	
		DemoBlock({name: "Email",content: function(console){
				
				
			return React.createElement(React.createClass({
				getInitialState: function(){
					return {
						value: null
					};
				},
				render: function(){
					return (
						React.DOM.div({},
							SF.DOM.email({
								name: "email",
								value: this.state.value,
								change: function(value){
									console.log(value);
								}
							}),
							
							React.DOM.br(),
							SF.DOM.button({name: "Set 'test'",action:function(){
								this.setState({value: "test"});
							}.bind(this)})
						)
					);
				}
			}));
		}}),
	
		DemoBlock({name: "Email thats required",content: function(console){
				
			return (
				React.DOM.div({},
					SF.DOM.email({
						required: true,
						name: "email",
						change: function(value){
							console.log(value);
						}
					})
				)
			);
		}}),
	
		React.DOM.h1({},"Multi"),
		DemoBlock({name: "Simple Multi Email",content: function(console){
			return (
				SF.DOM.multi({name: "email",change: function(value){
					console.log(value);
				}},SF.DOM.email())
			);
		}}),
		DemoBlock({name: "Multi with values",content: function(console){
			return (
				SF.DOM.multi({name: "email",value:["sdf","dylan@eezipay.com"],change: function(value){
					console.log(value);
				}},SF.DOM.email())
			);
		}}),
	
		React.DOM.h1({},"Forms"),
		DemoBlock({name: "Simple Form",content: function(){
			return (
				SF.DOM.form({onSubmit: function(model){
						console.log(model);
					}},
					SF.DOM.textfield({name: "Field1"}),
					React.DOM.div(null,
						React.DOM.div(null,
							SF.DOM.textfield({name: "Field2"})
						)
					)
				)
			);
		}}),
		DemoBlock({name: "Table Form",content: function(){
			return (
				SF.DOM.form({onSubmit: function(model){
						console.log(model);
					}},
					SF.DOM.table(null,
						SF.DOM.textfield({name: "Field1"}),
						React.DOM.div(null,
							React.DOM.div(null,
								SF.DOM.textfield({name: "Field2"})
							)
						),
						SF.DOM.group({name:"nested"},
							SF.DOM.textfield({name: "Field1"}),
							React.DOM.div(null,
								React.DOM.div(null,
									SF.DOM.textfield({name: "Field2"})
								)
							)
						)
					)
				)
			);
		}}),
		DemoBlock({name: "Table Form",content: function(){
			return (
				SF.DOM.form({onSubmit: function(model){
						console.log(model);
					}},
					SF.DOM.table(null,
						SF.DOM.textfield({name: "Field1"}),
						SF.DOM.email({name: "Email"})
					)
				)
			);
		}}),
		DemoBlock({name: "Compiled Form",content: function(){
			return (
				SF.DOM.compiledform({onSubmit: function(model){
						console.log(model);
					}},{
						name:"Name",
						surname:"Surname",
						nested:[
							"Field1","Field2"
						]
					}
				)
			);
		}})
	
	),document.body);
	
	
};
