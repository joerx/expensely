import React from 'react';
import {shallow} from 'enzyme';
import ExpenseRow from '../components/ExpenseRow';

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
    jest.clearAllMocks();
  });

  it('should render itself', () => {
    const {props, wrapper} = setup();
    expect(wrapper.find('.expense-row').length).toEqual(1);
    expect(wrapper.find(`.glyphicon-${props.actionIcon}`).length).toEqual(1);
  });

  it('should have the label set', () => {
    const {props, wrapper} = setup();
    expect(wrapper.find('.expense-label').at(0).text()).toMatch(/some label text/i);
  });

  it('should have the amount set', () => {
    const {props, wrapper} = setup();
    expect(wrapper.find('.expense-amount').at(0).text()).toMatch(/20.00/i);
  });

  it('should call the onActionClick handler when .row-action is clicked', () => {
    const {props, wrapper} = setup();
    wrapper.find('.row-action').at(0).simulate('click');
    expect(props.onActionClick.mock.calls.length).toEqual(1);
  });

});
