import React, { Component, Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { getBaseCurr, getRates } from "../actions";
import { connect } from "react-redux";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";

class ExchangeRates extends Component {
  state = {
    rates: "",
    baseCurr: "",
    favor: [],
  };
  componentDidMount() {
    this.ratesInit();
  }

  ratesInit = () => {
    this.props.dispatch(getBaseCurr());
    this.setState({
      baseCurr: this.props.baseCurr,
    });

    this.props.dispatch(getRates(this.props.baseCurr)).then(res => {
      let newObj = {};
      Object.keys(res.payload.rates).map(key => {
        newObj[key] = {};
        newObj[key].value = res.payload.rates[key];
        newObj[key].favor = false;
      });

      this.state.favor.map(item => {
        newObj[item].favor = true;
      });
      let topList = {};
      let bottomList = {};
      Object.keys(newObj).map(key => {
        if (newObj[key].favor) {
          topList[key] = newObj[key];
        } else {
          bottomList[key] = newObj[key];
        }
      });
      let filtered = { ...topList, ...bottomList };
      console.log(filtered);
      this.setState({
        rates: filtered,
      });
      Object.keys(filtered).map(row => {
        console.log(row);
      });
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.baseCurr !== this.props.baseCurr) {
      this.setState(
        {
          baseCurr: this.props.baseCurr,
        },
        () => {
          this.ratesInit();
        }
      );
    }
  }

  setFavor = val => {
    let favor = this.state.favor;
    favor.push(val);
    this.setState(
      {
        favor,
      },
      () => {
        this.ratesInit();
      }
    );
  };

  unsetFavor = val => {
    let favor = this.state.favor.filter(item => item !== val);
    this.setState(
      {
        favor,
      },
      () => {
        this.ratesInit();
      }
    );
  };
  render() {
    console.log(this.state);
    return (
      <Fragment>
        <Paper>
          {this.state.rates ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{this.state.baseCurr}</TableCell>
                  <TableCell align="right">Rate</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(this.state.rates).map(row => (
                  <TableRow>
                    <TableCell>
                      {row}{" "}
                      {this.state.rates[row].favor ? (
                        <StarIcon onClick={() => this.unsetFavor(row)} />
                      ) : (
                        <StarBorderIcon onClick={() => this.setFavor(row)} />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {this.state.rates[row].value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : null}
        </Paper>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    baseCurr: state.baseCurr,
    rates: state.rates,
  };
};

export default connect(mapStateToProps)(ExchangeRates);
