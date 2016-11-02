import React from 'react';
import parseInput from '../helpers/parseInput';

// Presentational component
// - onSubmit: fn({item, amount})
class InputField extends React.Component {
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
      <section className="input-form">
        <form className="form" onSubmit={validate}>
          <div className={formGroupClass}>
            <div className="input-group">
              <input type="text" className="form-control" ref="input" placeholder="e.g. Milk 1.95"/>
              <span className="input-group-btn">
                <button type="submit" className="btn btn-primary">
                  Enter
                </button>
              </span>
            </div>
          </div>
        </form>
      </section>
    );
  }
}

export default InputField;
