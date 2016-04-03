import React from 'react';

export default class App extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (<h1>{this.props.title}</h1>)
  }
}
