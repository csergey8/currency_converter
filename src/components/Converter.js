import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { getBaseCurr, getRates } from "../actions";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

class Converter extends Component {
  state = {
    selectCurr: "",
    firstCurr: "USD",
    secondCurr: "EUR",
    inputField: 0,
    result: 0,
  };
  componentDidMount() {
    this.props.dispatch(getBaseCurr());
    this.setState({
      baseCurr: this.props.baseCurr,
    });
    this.props.dispatch(getRates(this.state.firstCurr)).then(res => {
      let currencyToSelect = [];
      Object.keys(res.payload.rates).map(key => {
        currencyToSelect.push(key);
      });
      this.setState({
        selectCurr: currencyToSelect,
      });
    });
  }

  handleFirstSelectChange = e => {
    this.setState({
        firstCurr: e.target.value,
        },
      () => {
        this.props.dispatch(getRates(this.state.firstCurr)).then(() => {
          this.convert();
        });
      }
    );
  };

  handleSecondSelectChange = e => {
    this.setState({
        secondCurr: e.target.value,
      },
      () => {
        this.convert();
      }
    );
  };

  convert() {
    let result =
      this.state.inputField * this.props.rates.rates[this.state.secondCurr];
    if (this.state.firstCurr === this.state.secondCurr) {
      result = this.state.inputField * 1;
    }
    this.setState({
      result: result.toFixed(2),
    });
  }

  handleInput = e => {
    this.setState({
        inputField: e.target.value,
      },
      () => {
        this.convert();
      }
    );
  };

  render() {
    return (
      <Paper>
        <Select
          value={this.state.firstCurr}
          onChange={this.handleFirstSelectChange}
        >
          {this.state.selectCurr
            ? this.state.selectCurr.map(item => (
                <MenuItem value={item}>{item}</MenuItem>
              ))
            : null}
        </Select>
        <TextField onChange={this.handleInput} />
        <Select
          value={this.state.secondCurr}
          onChange={this.handleSecondSelectChange}
        >
          {this.state.selectCurr
            ? this.state.selectCurr.map(item => (
                <MenuItem value={item}>{item}</MenuItem>
              ))
            : null}
        </Select>
        <TextField
          InputProps={{
            readOnly: true,
          }}
          value={this.state.result}
        />
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    baseCurr: state.baseCurr,
    rates: state.rates,
  };
};

export default connect(mapStateToProps)(Converter);
