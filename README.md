# STORM React Forms

__DEMO__: http://projectstorm.cloud/react-forms

A super simple, no-nonsense form library written in React that (hopefully) just works.

[![Join the chat at https://gitter.im/projectstorm/react-forms](https://badges.gitter.im/projectstorm/react-diagrams.svg)](https://gitter.im/projectstorm/react-forms?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![NPM](https://img.shields.io/npm/v/storm-react-forms.svg)](https://npmjs.org/package/storm-react-forms)
[![NPM](https://img.shields.io/npm/dt/storm-react-forms.svg)](https://npmjs.org/package/storm-react-forms)
[![CircleCI](https://circleci.com/gh/projectstorm/react-forms/tree/master.svg?style=svg)](https://circleci.com/gh/projectstorm/react-forms/tree/master)

![Demo1](./images/screenshot1.png)

## Start Here

Forms in React can be quite difficult, but with this library, forms become quite easy. 
Storm React Forms (SRF) provides a simple way to create forms in a very declarative way.

Declare your form using standard react widgets, but make use of __Storm Element Widgets__
when you want to actually use an input field. When you click submit on your form, the form
will fire a `formSubmitEvent(model)` which will contain an object with all the values in your form.

### Example

```jsx
<FormWidget formSubmitEvent={ model => console.log(model) }>
	<TableLayoutWidget>
		<FieldElementWidget name="Name" />
		<FieldElementWidget name="Surname" />
	</TableLayoutWidget>
</FormWidget>
```

The model will contain {Name, Surname}

### One-way binding

you can pass a `value={object}` onto a form and it will automatically populate
your form fields with the values in the object. This does not change `object` when the form fires
but instead will pass the new object as the first param in the `formSubmitEvent(object)` (like in the previous example)


## Usage

Take a look at the demos URL as well as the demos folder (docs will follow soon)
