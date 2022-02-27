import React, { Component } from 'react';
import axios from 'axios';
import './body.css';
export default class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getCovidS = this.getCovidS.bind(this);
    this.getCovidS();
  }
  getCovidS() {
    axios
      .get('https://api.covid19api.com/summary')
      .then((result) => {
        console.log(result.data);
        var contryAssinding = result.data.Countries.sort(
          (a, b) => b.TotalConfirmed - a.TotalConfirmed
        );

        this.setState({
          covidData: {
            Global: result.data.Global,
            Countries: contryAssinding,
          },
        });
      })
      .catch((err) => {});
  }

  render() {
    var view;
    if (this.state.covidData) {
      var worldView = (
        <div className="world_view">
          <h4 className="world_view_header">
            In the World{' '}
            <span>Last Uptaded {this.state.covidData.Global.Date}</span>
          </h4>
          <div className="world_summery">
            <h6 className="">New</h6>
            <div className="d-flex">
              <div className="">
                <p>Confirmed</p>
                <p>{this.state.covidData.Global.NewConfirmed}</p>
              </div>
              <div>
                <p>Deaths</p>
                <p>{this.state.covidData.Global.NewDeaths}</p>
              </div>
            </div>
          </div>
          <div className="world_summery">
            <h6 className="border-bottom m-0">Total</h6>
            <div className="d-flex">
              <div>
                <p>Confirmed</p>
                <p>{this.state.covidData.Global.TotalConfirmed}</p>
              </div>
              <div>
                <p>Deaths</p>
                <p>{this.state.covidData.Global.TotalDeaths}</p>
              </div>
            </div>
          </div>
        </div>
      );
      var countryView = (
        <div className="country_view">
          <h4 className="country_view_header">
            Country{' '}
            <span className="lastUpdate text-muted">
              Last Uptaded {this.state.covidData.Global.Date}
            </span>
          </h4>
          <table class="table table-success table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Country</th>
                <th scope="col">Total Confirmed</th>
                <th scope="col">Total Deaths</th>
              </tr>
            </thead>
            <tbody>
              {this.state.covidData.Countries.map((e, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{e.Country}</td>
                  <td>
                    {e.TotalConfirmed}
                    {e.NewConfirmed !== 0 ? (
                      <span className="newReport">+ {e.NewConfirmed}</span>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {e.TotalDeaths}
                    {e.NewDeaths !== 0 ? (
                      <span className="newReport">+ {e.NewDeaths}</span>
                    ) : (
                      ''
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      view = (
        <div>
          {worldView}
          {countryView}
        </div>
      );
    } else {
      view = <div className="spinner-border loading_style" role="status"></div>;
    }
    return <div className="container-lg">{view}</div>;
  }
}
