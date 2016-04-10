import React from 'react';
import {connect} from 'react-redux';
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


// List of expenses - display and manipulation of history
// - total: number
// - expenses: array[expense]
// - onHistoryItemDelete: fn()
// - onHistoryReset: fn()
const ExpenseList = ({total, expenses, onHistoryReset, onItemDelete}) => (
  <section className="expense-list">
    <SummaryRow amount={total} onReset={onHistoryReset} />
    <ExpenseHistory expenses={expenses} onItemDelete={onItemDelete} />
  </section>
)

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
        <div className="col col-xs-12">
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

// Summary row, presentational 
// - amount: number
// - onResetClicked: fn()
const SummaryRow = ({onReset, amount}) => (
  <div className="row summary-row">
    <div className="col col-xs-7 col-md-9">
      <span className="summary-label">Total so far:</span>
    </div>
    <div className="col col-xs-5 col-md-3 summary-amount">
      <span>{printf('%.2f S$', amount)}</span>
      <a className="row-action" onClick={_ => confirm('Are you sure?') && onReset()}>
        <span className="glyphicon glyphicon-refresh"/>
      </a>
    </div>
  </div>
)

// List of expenses
// - expenses: array[expense]
// - onHistoryItemDelete: fn(id)
const ExpenseHistory = ({expenses, onItemDelete}) => {
  const list = expenses.map((e, idx) => (
    <HistoryRow key={idx} amount={e.amount} item={e.item} onDelete={_ => onItemDelete(idx)} />
  ));
  return (<section className="expense-history">{list}</section>)
}

// Single expense
// - onDelete()
const HistoryRow = ({item, amount, onDelete}) => (
  <div className="row history-row">
    <div className="col col-xs-7 col-md-8">
      <span className="row-label">{ucfirst(item)}</span>
    </div>
    <div className="col col-xs-5 col-md-4 row-amount">
      <span>{printf('%.2f S$', amount)}</span>
      <a className="row-action" onClick={onDelete}>
        <span className="glyphicon glyphicon-remove"/>
      </a>
    </div>
  </div>
);

const AddExpense = connect(
  state => state,
  dispatch => ({
    onSubmit: ({item, amount}) => dispatch(addExpense(item, amount))
  })
)(InputField);

const ExpenseHistoryContainer = connect(
  state => state,
  dispatch => ({
    onItemDelete: id => dispatch(removeExpense(id)),
    onHistoryReset: _ => dispatch(resetExpenses())
  })
)(ExpenseList);

// App, presentational, renders everything else
export class App extends React.Component {
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
