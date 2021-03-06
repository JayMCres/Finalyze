import React, { Component } from "react";
import { Segment, Image } from "semantic-ui-react";
import DetailsPage from "./DetailsPage";
import DetailsProfile from "./CompanyDetails/CompanyProfile/DetailsProfile";

export default class CompanyDetails extends Component {
  state = {
    quaterlyISData: [],
    quaterlyBSData: [],
    quaterlyCFData: [],
    historicals: []
  };

  componentDidMount() {
    return this.fetchAllQuaterlyData();
  }

  fetchAllQuaterlyData = async () => {
    await this.fetchQuaterlyISData();
    await this.fetchQuaterlyBSData();
    await this.fetchQuaterlyCFData();
    await this.fetchHistoricals();
  };

  fetchHistoricals = async () => {
    // e.preventDefault();
    const response = await fetch("http://localhost:5000/api/historicals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ post: this.props.clickedTicker.ticker })
    });
    const body = await response.json();
    // console.log(body);
    this.setState({
      historicals: body
    });
  };

  fetchQuaterlyISData = async () => {
    // e.preventDefault();
    const response = await fetch("http://localhost:5000/api/quaterlyis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ post: this.props.clickedTicker.ticker })
    });
    const body = await response.json();
    // console.log(body);
    this.setState({
      quaterlyISData: body
    });
  };

  fetchQuaterlyCFData = async () => {
    // e.preventDefault();
    const response = await fetch("http://localhost:5000/api/quaterlycf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ post: this.props.clickedTicker.ticker })
    });
    const body = await response.json();
    // console.log(body);
    this.setState({
      quaterlyCFData: body
    });
  };

  fetchQuaterlyBSData = async () => {
    // e.preventDefault();
    const response = await fetch("http://localhost:5000/api/quaterlybs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ post: this.props.clickedTicker.ticker })
    });
    const body = await response.json();
    // console.log(body);
    this.setState({
      quaterlyBSData: body
    });
  };

  handleDetailsMenuRender = () => {
    if (
      this.props.summaryFinancials.length === 0 ||
      this.props.annualISData.length === 0 ||
      this.props.annualCFData.length === 0 ||
      this.props.annualBSData.length === 0
    ) {
      return (
        <Segment loading>
          <Image src="/images/wireframe/paragraph.png" />
        </Segment>
      );
    } else {
      return (
        <DetailsPage
          summaryFinancials={this.props.summaryFinancials}
          annualISData={this.props.annualISData}
          annualBSData={this.props.annualBSData}
          annualCFData={this.props.annualCFData}
          quaterlyISData={this.state.quaterlyISData}
          quaterlyBSData={this.state.quaterlyBSData}
          quaterlyCFData={this.state.quaterlyCFData}
          historicals={this.state.historicals}
        />
      );
    }
  };

  render() {
    // console.log("Company Details State", this.props);
    return (
      <Segment inverted>
        <DetailsProfile
          clickedTicker={this.props.clickedTicker}
          companyProfile={this.props.companyProfile}
        />
        {this.handleDetailsMenuRender()}
      </Segment>
    );
  }
}
