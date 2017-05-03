import * as SRF from "../../src/main";
import * as React from "react";
import * as ReactDOM from "react-dom";

declare var require: {
	<T>(path: string): T;
	(paths: string[], callback: (...modules: any[]) => void): void;
	ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

require("../test.scss");

/**
 * Simple test that shows how to use this library
 *
 * @Author Dylan Vorster
 */
window.onload = () => {

	//re-render the model
	ReactDOM.render(

		React.DOM.div(null,

			//simple form
			SRF.DOM.form({formSubmitEvent: (model) => { console.log(model); }},
				SRF.DOM.input({name:'field1'}),
				SRF.DOM.input({name:'field2'})
			),

			//slightly more advanced form
			SRF.DOM.form({
					formSubmitEvent: (model) => {
						console.log(model);
					}
				},
				SRF.DOM.table(null,
					SRF.DOM.input({name:'field1',valueChangedEvent:(val)=> {
						console.log(val);
					}}),
					SRF.DOM.input({name:'field2'})
				)
			),
		),
		document.body);
}