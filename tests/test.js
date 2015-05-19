var StormForms = require("../");
var React = require("react");
var div = React.createFactory('div');

window.onload = function(){
	
	
	var forms = [];
	
	/*
	 * This is a common action we want to fire for all the models 
	 */
	var formAction  = function(value){
		console.log(value);
	};
	
	//!---------------------------- SIMPLE FORM --------------------------------
	
	/*
	 * This is the simplest possible way to get a form on the page.
	 * By default is uses the default form model.
	 */
	forms.push({name: "Simple Form", form: 
			
			
		StormForms.FormFactory({ 
			action: formAction,
			children: [ "Test Input"]
		})
		
		
	});
	
	//!---------------------- SIMPLE FORM - CUSTOM MODEL -------------------------
	
	/*
	 * We want to use a custom model
	 */
	var customReusableModel = React.createClass({
		
		//and ofc a render method
		render: function(){
			return div({className: "custom-class"},React.Children.map(this.props.children,function(element){
				return StormForms.Engine.generateElement(element);
			}));
		}
	});
	
	forms.push({name: "Custom Form", form: 
			
			
		StormForms.FormFactory({action: formAction},
			React.createElement(customReusableModel,null,
				[ "Test Input"]))
		
		
	});
	
	//!--------------- USING CUSTOM HTML INLINE (NO MODEL) ---------------------
	
	/*
	 * Here we are not using a model at all, and are giving the form its own
	 * inline HTML structure. In this case because there is no model,
	 * there is no getValue() method, so internally in the form we have
	 * to traverse the tree and find all elements that can getValue() and then
	 * give them a handle that they can hook into when we finally call getValue().
	 * 
	 *  Note: react does not have a way 
	 */
	forms.push({name: "RAW Form", form: 
			
			
		StormForms.FormFactory({ action: formAction},
			div(null,
				div({className: "myclass"},
					StormForms.factories.Input,{name: "Test Input 2"})))
					
					
	});
				
		
				
	/*
	 * Which is functionally equivelant to the following JSX:
	 * 
	 * <form action="formAction"
	 *		<div>
	 *			<div className="myClass">
	 *				<input name="Test Input">
	 *			</div>
	 *		</div>
	 * </form>
	 */
	
	/*
	 * You can also use a generator to build these elements,
	 * In this case it builds a model and passes it into the form
	 */
	
	forms.push({name: "Generator Form", form: 
			
			
		StormForms.FormFactory({ action: formAction},
			StormForms.Engine.generateElement({
				type:'model',
				children:[
					"Test Input","Test Input2"
				]
			}))
			
			
			
	});
	
	//!----------------------- MORE ADVANCED ELEMENTS --------------------------
	
	forms.push({name: "Large Form", form: 
			
			
		StormForms.FormFactory({ action: formAction},
			StormForms.factories.Model({children:[
				
				{name:"Name"},
				{name:"Surname"},
				
				//!---------- NESTED MODEL ---------
				{type:"model",name:"Contact Details",children: [
					{name:"Tel"},
					{name:"Cell"}
				]},
				
				{type:"multi",model:{type:"text",name: "test"}},

				//!---------- SELECTS ---------
				{type:"select",name:"Select ver 1",options:{"1":"test prop1"}},
				{type:"select",name:"Select ver 2",options:["test prop1","test prop2"]},


				//!---------- OTHER TYPES ---------
				{type:"boolean",name:"Option"},
				{type:"file",name:"file"},
				{type:"area",name:"area"},
				{type:"auto",name:"area",options: ["South Africa","Something Else",{title: "Test"}]},
			]}))
		
		
		
	});
	
	
	for(var i = 0;i < forms.length;i++){
		var element = document.createElement('div');
		element.setAttribute('id','form-'+i);
		document.body.appendChild(element);
	
		console.log("Form: "+forms[i].name);
		React.render(div({},'Form: '+forms[i].name,forms[i].form),element);
	}
	
};
