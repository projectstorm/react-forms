# Welcome to STORM React Forms

The Storm react form library is, as the name implies, a react library for working with forms in javascript. It is a library that simplifies creating, and working with forms in a fast and effecient manner.

* Create Simple Forms
* Create Advanced forms with many nested components
* Use built in layout managers to make your form responsive
* Provide custom HTML for those tricky forms that need some custom attention
* Register your own layout managers and components

## Simple Example ##

In this example, creating a form is as simple as passing in a function which occurs when the form is submited, and providing an array of elemens that make up the form.

```javascript
	form({ 
		action: formAction,
		elements: [ "Test Input" ]
	});
```

In this example ```Test Input``` will become a standard input element with the same placeholder and label as its name. Furthermore, the engine will by default layout the elements in a responsive table.

The above example is equivelant to:

```javascript
	form({ 
		action: formAction,
		elements: [ {name:"Test Input"} ] //here we use a json object
	});
```

which is also the same as:

```javascript
	form({ 
		action: formAction,
		elements: [
			{ 
				name: "Test Input",
			 	type: "TEXT"  //we force the type of input
			}
		]
	})
```

## Simple Example, Custom Model ##

In this example, we want to use a different layout manager to the defualt one, and so we create it first inline as a normal react class, and then we tell the form to use it.

```javascript
	var customReusableModel = React.createClass({

		render: function(){
			return div({className: "custom-css-class"},this.props.elements.map(function(element){
				return Engine.generateElement(element);
			}));
		}
	});
	
	form({ 
		action: formAction,
		type: customReusableModel, //use the model we just created
		elements: [ "Test Input"]
	});
```

We can also register this class globally so we can use it later

```javascript
	/*
	 * While we can pass the type in each time, its easier to register
	 * the custom model with the form engine
	 */
	Engine.registerClass('custom-model',customReusableModel);
	
	form({ 
		action: formAction,
		type: 'custom-model', //reuse our code
		elements: [ "Test Input"]
	});
```

## Inline Form Layout ##

Here we are not using a model at all, and are giving the form its own
inline HTML structure.

```javascript

	form({ action: formAction},
		div(null,
			div({className: "myclass"},
				React.createElement(input,{name: "Test Input"}))));
```

which is functionally equivelant to
```jsx
<form action="formAction"
	<div>
		<div className="myClass">
			<input name="Test Input">
		</div>
	</div>
</form>
```

## More ways to generate layout ##

Because everything in this library goes through the engine, you can also just use the factory method on the engine which will generate the elements much like in the example above.

```javascript
	form({ action: formAction},
	
		//this method emulates what the simple form example
		//does internally.
		Engine.generateElement({
			type:'model',
			sideLabels: false,
			elements:[
				{name: "Test Input"}
			]
		})
	);
```

