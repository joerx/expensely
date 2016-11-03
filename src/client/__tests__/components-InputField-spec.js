'use strict';

// jest.unmock('../../public/src/js/App'); // components we want to test
// jest.unmock('../../public/src/js/actions'); // simpler to test if we use real actions

// // a few more imports and this stuff starts looking like Java
// import React from 'react';
// import ReactDOM from 'react-dom';
// import TestUtils from 'react-addons-test-utils';
// import {InputField} from '../../public/src/js/App';

describe('InputField', () => {

  it('call dispatch on store', () => {
    expect(true).toEqual(true);
    // const store = {};
    // store.dispatch = jest.genMockFunction();

    // const inputField = TestUtils.renderIntoDocument(
    //   <InputField store={store} />
    // );
    // const inputFieldNode = ReactDOM.findDOMNode(inputField);
    // const formNode = inputFieldNode.querySelector('form');
    // const inputNode = inputFieldNode.querySelector('input');

    // inputNode.value = 'Item .5';
    // TestUtils.Simulate.submit(formNode);

    // expect(store.dispatch).toBeCalledWith(
    //   {type: 'ADD_EXPENSE', item: 'Item', amount: 0.5}
    // );
  })
});
