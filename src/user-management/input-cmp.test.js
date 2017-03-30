import React from 'react';
import {InputCmp} from '../input-cmp';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
// const metaData=require("./data.json");

describe('InputCmp', () => {
	it('renders without crashing', () => {
		//prepare
		let compenent= renderer.create(<InputCmp/>).toJSON();
		//check
		expect(compenent).toMatchSnapshot();
	});

	it("")
});
