import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { connect } from 'react-redux';
import { getBaseCurr, setBaseCurr, getRates } from '../actions';

class Layout extends Component {
  state = {
    value: 0,
    baseCurr: '',
    selectCurr: ''
  };

  componentDidMount() {
    this.props.dispatch(getBaseCurr())
    this.setState({
      baseCurr: this.props.baseCurr
    })
    this.props.dispatch(getRates(this.props.baseCurr))
      .then(res => {
        let currencyToSelect = []
        Object.keys(res.payload.rates).map(key => {
          currencyToSelect.push(key)
        })
        this.setState({
          selectCurr: currencyToSelect
        })
      })
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  handleSelectChange = e => {
    this.setState({
      baseCurr: e.target.value
    });
    this.props.dispatch(setBaseCurr(e.target.value))
  }
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Select
              value={this.state.baseCurr}
              onChange={this.handleSelectChange}
              variant="outlined"
              style={{ color: '#fff' }}
            >
              {
                this.state.selectCurr ?
                  this.state.selectCurr.map(item => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  ))
                  : null
              }
            </Select>
          </Toolbar>
          <Tabs
            variant="fullWidth"
            value={this.state.value}
            onChange={this.handleChange}
            aria-label="nav tabs example"
          >
            <Tab label="converter" component={Link} to="/converter" />
            <Tab label="exchange" component={Link} to="/exchange" />
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    baseCurr: state.baseCurr,
    rates: state.rates
  }
}

export default connect(mapStateToProps)(Layout);
