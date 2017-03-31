import React from 'react';
import {InputCmp} from '../user-management/input-cmp';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
// import sinon from 'sinon';
// const metaData=require("./data.json");

describe('InputCmp', () => {
	
	it('should renders without crashing', () => {
		//prepare
		const component= renderer.create(<InputCmp/>).toJSON();
		//check
		expect(component).toMatchSnapshot();
	});

});
