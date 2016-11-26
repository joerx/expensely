import React from 'react';
import ExpenseRow from '../components/ExpenseRow';
import renderer from 'react-test-renderer';

function setup() {
  const props = {
    actionIcon: 'ok',
    onActionClick: jest.fn(),
    label: 'some label text',
    amount: 20
  }
  const wrapper = shallow(<ExpenseRow {...props}/>);
  return {props, wrapper};
}

describe('ExpenseRow component', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render itself', () => {
    const props = {
      actionIcon: 'ok',
      onActionClick: jest.fn(),
      label: 'some label text',
      amount: 20
    };
    const component = renderer.create(
      <ExpenseRow {...props}/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});
