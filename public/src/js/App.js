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

// Containers
// manages listing & removing expenses 
class ExpenseHistoryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.store.getState();
    props.store.subscribe(_ => 
      this.setState(props.store.getState())
    );
  }
  render() {
    return (<ExpenseList 
      expenses={this.state.expenses} 
      total={this.state.total}
      onItemDelete={id => this.dispatchItemDelete(id)} 
      onHistoryReset={_ => this.dispatchHistoryReset() }/>
    );
  }
  dispatchItemDelete(id) {
    this.props.store.dispatch(removeExpense(id));
  }
  dispatchHistoryReset() {
    this.props.store.dispatch(resetExpenses());
  }
}

// manages creating new expenses
class AddExpense extends React.Component {
  render() {
    return <InputField onSubmit={item => this.dispatchAddExpense(item)} />
  }
  dispatchAddExpense({item, amount}) {
    this.props.store.dispatch(addExpense(item, amount));
  }
}

// App, presentational, renders everything else
export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1 className="title">{this.props.title}</h1>
        <AddExpense store={this.props.store} />
        <ExpenseHistoryContainer store={this.props.store} />
      </div>
    )
  }
}

// Presentational component 
// - onSubmit: fn({item, amount})
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

    const validate = (e) => {
      e.preventDefault();
      const [item, amount, err] = parseInput(this.refs.input.value);
      if (err) {
        this.setState({valid: false});
      } else {
        this.setState({valid: true});
        this.props.onSubmit({item, amount});
        this.refs.input.value = '';
        this.refs.input.focus();
      }
    }

    return (
      <section className="row">
        <div className="col col-md-12">
          <form className="form" onSubmit={validate}>
            <div className={formGroupClass}>
              <div className="input-group">
                <input
                  type="text" 
                  className="form-control" 
                  ref="input" 
                  placeholder="e.g. Milk 1.95"/>
                <span className="input-group-btn">
                  <button 
                    type="submit" 
                    className="btn btn-primary">
                    Enter
                  </button>
                </span>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

// List of expenses - display and manipulation of history
// - total: number
// - expenses: array[expense]
// - onHistoryItemDelete: fn()
// - onHistoryReset: fn()
export class ExpenseList extends React.Component {
  render() {
    return (
      <section className="expense-list">
        <SummaryRow 
          amount={this.props.total}
          onReset={_ => this.props.onHistoryReset()} />
        <ExpenseHistory 
          expenses={this.props.expenses}
          onItemDelete={id => this.props.onItemDelete(id)} />
      </section>
    )
  }
}

// Summary row, presentational 
// - amount: number
// - onResetClicked: fn()
export class SummaryRow extends React.Component {
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
            {printf('%.2f S$', this.props.amount)}
          </span>
          <a className="row-action" onClick={_ => this.resetClicked()}>
            <span className="glyphicon glyphicon-refresh"/>
          </a>
        </div>
      </div>
    )
  }
  resetClicked() {
    confirm('Are you sure?') && this.props.onReset()
  }
}

// List of expenses
// - expenses: array[expense]
// - onHistoryItemDelete: fn(id)
export class ExpenseHistory extends React.Component {
  render() {
    const list = this.props.expenses.map((e, idx) => {
      const id = this.props.expenses.indexOf(e);
      return (
        <HistoryRow key={id} amount={e.amount}
          onDelete={_ => this.props.onItemDelete(id)}>
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

// Single expense
// - onDelete()
export class HistoryRow extends React.Component {
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
          <a className="row-action" onClick={_ => this.props.onDelete()}>
            <span className="glyphicon glyphicon-remove"/>
          </a>
        </div>
      </div>
    )
  }
}
