import React from 'react';
import ExpenseList from '../components/ExpenseList';
import ExpenseRow from '../components/ExpenseRow';
import LoadingRow from '../components/LoadingRow';
import {shallow, mount} from 'enzyme';

function setup(render=shallow) {
  const props = {
    onItemDelete: jest.fn(),
    fetching: false,
    expenses: [
      {item: 'milk', amount: .5},
      {item: 'water', amount: .5},
      {item: 'apples', amount: .5}
    ]
  };
  const wrapper = render(<ExpenseList {...props}/>);
  return {props, wrapper};
}

describe('ExpenseList component', () => {

  it('should render itself', () => {
    const {wrapper, props} = setup();
    expect(wrapper.find('.expense-list').length).toEqual(1);
  });

  // default, shallow rendering
  it('should render one child for each expense', () => {
    const {wrapper, props} = setup();
    console.log('## Shallow Rendering:');
    console.log(wrapper.debug());
    expect(wrapper.find(ExpenseRow).length).toEqual(props.expenses.length);
  });

  // full DOM rendering
  it('should render the DOM for each child', () => {
    const {props} = setup();
    const wrapper = mount(<ExpenseList {...props}/>);
    console.log('## Full DOM Rendering:');
    console.log(wrapper.debug());
    expect(wrapper.find('.expense-row').length).toEqual(props.expenses.length);
  });

  it('should invoke onItemDelete when row icon is clicked', () => {
    const {props, wrapper} = setup(mount);
    wrapper.find('.expense-row .row-action').at(0).simulate('click');
    expect(props.onItemDelete.mock.calls.length).toEqual(1);
  });

  it('should pass the matching item to the onItemDelete handler', () => {
    const {props, wrapper} = setup(mount);
    wrapper.find('.expense-row .row-action').at(0).simulate('click');
    const args = props.onItemDelete.mock.calls[0];
    expect(args[0]).toEqual(props.expenses[0]);
  });

  it('should render LoadingRow if `fetching` is true', () => {
    const props = {
      onItemDelete: jest.fn(),
      fetching: true,
      expenses: []
    }
    const wrapper = shallow(<ExpenseList {...props} />);
    expect(wrapper.find(LoadingRow).length).toEqual(1);
    expect(wrapper.find(ExpenseRow).length).toEqual(0);
  });
});
