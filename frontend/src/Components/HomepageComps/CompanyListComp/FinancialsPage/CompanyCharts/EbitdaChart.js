import React, { Component } from "react";
import { Message } from "semantic-ui-react";
import Chart from "react-google-charts";

export default class EbitdaChart extends Component {
  render() {
    const options = {
      legend: { textStyle: { color: "#00FF00" }, position: "bottom" },
      backgroundColor: "black",
      hAxis: {
        textStyle: { color: "#00FF00" }
      },
      vAxis: {
        textStyle: { color: "#00FF00" }
      }
    };
    const data = [
      ["Element", "EBITDA", { role: "style" }],
      ["2014", this.props.YrOne, "color: #6666ff"], // RGB value
      ["2015", this.props.YrTwo, "color: #6666ff"], // English color name
      ["2016", this.props.YrThree, "color: #6666ff"],
      ["2018", this.props.YrFour, "color: #6666ff"],
      ["2019", this.props.YrFive, "color: #6666ff"] // CSS-style declaration
    ];
    return (
      <div>
        {[this.props].length === 0 ? (
          <div> "NO CHART"</div>
        ) : (
          <div>
            <Message attached="top" color="blue">
              <strong>EBITDA</strong>
            </Message>
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="400px"
              data={data}
              loader={<div>Loading Chart</div>}
              options={options}
            />
          </div>
        )}
      </div>
    );
  }
}
