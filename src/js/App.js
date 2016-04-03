import React from 'react';
import {addExpense, removeExpense, resetExpenses} from './actions';
import printf from 'printf';

function parseInput(input) {
  const matches = input.match(/^(\w*)\s(\d*\.?\d*)/);
  return matches ? 
    [matches[1], Number(matches[2])] : 
    [null, null, `Cannot parse ${input}`];
}

function ucfirst(str) {
  return str[0].toUpperCase() + str.substr(1, str.length);
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <h1 className="title">{this.props.title}</h1>
        <InputField store={this.props.store} />
        <ExpenseList store={this.props.store} />
      </div>
    )
  }
}

export class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {valid: true};
  }
  render() {
    const formGroupClass = [
      'form-group', 
      !this.state.valid ? 'has-error' : undefined
    ].join(' ');
    return (
      <section className="row">
        <div className="col col-md-12">
          <form className="form" onSubmit={e => this.formSubmit(e)}>
            <div className={formGroupClass}>
              <div className="input-group">
                <input type="text" className="form-control" ref="input" placeholder="e.g. Milk 2$"/>
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-primary">Enter</button>
                </span>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
  formSubmit(e) {
    e.preventDefault();
    const [item, amount, err] = parseInput(this.refs.input.value);
    if (err) {
      this.setState({valid: false});
    } else {
      this.setState({valid: true});
      this.props.store.dispatch(addExpense(item, amount));
      this.refs.input.value = '';
      this.refs.input.focus();
    }
  }
}

export class ExpenseList extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <section className="expense-list">
        <SummaryRow store={this.props.store} />
        <ExpenseHistory store={this.props.store} />
      </section>
    )
  }
}

export class SummaryRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: props.store.getState().total
    }
    props.store.subscribe(_ => 
      this.setState({amount: props.store.getState().total})
    )
  }
  render() {
    return (
      <div className="row summary-row">
        <div className="col col-md-8">
          <span className="summary-label">
            Total so far:
          </span>
        </div>
        <div className="col col-md-4 summary-amount">
          <span>
            {printf('%.2f S$', this.state.amount)}
          </span>
          <a className="row-action" onClick={_ => this.resetClicked()}>
            <span className="glyphicon glyphicon-refresh"/>
          </a>
        </div>
      </div>
    )
  }
  resetClicked() {
    if (confirm('Are you sure?') === true) {
      this.props.store.dispatch(resetExpenses())
    }
  }
}

export class ExpenseHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {expenses: props.store.getState().expenses};
    props.store.subscribe(_ => this.storeHasChanged())
  }
  storeHasChanged() {
    this.setState({expenses: this.props.store.getState().expenses});
  }
  render() {
    const list = this.state.expenses.map((e, idx) => {
      const id = this.state.expenses.indexOf(e);
      return (
        <HistoryRow 
          key={id}
          id={id}
          amount={e.amount}
          store={this.props.store}>
          {e.item}
        </HistoryRow>)
      })
    return (
      <section className="expense-history">
        {list}
      </section>
    )
  }
}

export class HistoryRow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row history-row">
        <div className="col col-md-8">
          <span className="row-label">
            {ucfirst(this.props.children)}
          </span>
        </div>
        <div className="col col-md-4 row-amount">
          <span>
            {printf('%.2f S$', this.props.amount)}
          </span>
          <a className="row-action" onClick={_ => this.removeRowClicked()}>
            <span className="glyphicon glyphicon-remove"/>
          </a>
        </div>
      </div>
    )
  }
  removeRowClicked() {
    this.props.store.dispatch(removeExpense(this.props.id));
  }
}
