import React from 'react';


export default class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <h1 className="title">{this.props.title}</h1>
        <InputField />
        <ExpenseList data={this.props.data} />
      </div>
    )
  }
}

class InputField extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <section className="row">
        <div className="col col-md-12">
          <form className="form">
            <div className="form-group">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="e.g. Milk 2$"/>
                <span className="input-group-btn">
                  <button type="button" className="btn btn-primary">Enter</button>
                </span>
              </div>
            </div>
          </form>
        </div>
      </section>
    )
  }
}

class ExpenseList extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <section className="expense-list">
        <SummaryRow />
        <ExpenseHistory data={this.props.data} />
      </section>
    )
  }
}

class SummaryRow extends React.Component {
  constructor(props) {
    super(props)
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
            123 S$
          </span>
          <a className="row-action">
            <span className="glyphicon glyphicon-refresh"/>
          </a>
        </div>
      </div>
    )
  }
}

class ExpenseHistory extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const list = this.props.data.map((e, idx) => (
      <HistoryRow id="idx" amount={e.amount}>{e.item}</HistoryRow>
    ))
    return (
      <section className="expense-history">
        {list}
      </section>
    )
  }
}

class HistoryRow extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="row history-row">
        <div className="col col-md-8">
          <span className="row-label">
            {this.props.children}
          </span>
        </div>
        <div className="col col-md-4 row-amount">
          <span>
            {this.props.amount} S$
          </span>
          <a className="row-action">
            <span className="glyphicon glyphicon-remove"/>
          </a>
        </div>
      </div>
    )
  }
}
