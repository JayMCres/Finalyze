import React, { Component } from "react";
import { Segment, Label, Icon } from "semantic-ui-react";

import Search from "./LandingPage/Search";
import CompanyList from "./LandingPage/CompanyList";
import FinancialsSummaryContainer from "./FinancialsPage/FinancialsSummaryContainer";

export default class CompaniesContainer extends Component {
  state = {
    inputValue: "",
    // companies: [],
    companyFinancialSummary: false,
    clickedCompany: null,
    response: "",
    post: "",
    clickedCompanyData: [],
    clickedCompanyRatios: []
  };

  handleCompanyFinancials = itemId => {
    const clickedCompany = this.props.companies.find(
      item => item.id === itemId
    );
    // console.log("clicked Company", clickedCompany);
    this.setState({
      clickedCompany: clickedCompany,
      companyFinancialSummary: false
    });
  };

  handleClickedCompanyPost = async () => {
    const response = await fetch("http://localhost:5000/api/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ post: this.state.clickedCompany.ticker })
    });
    const body = await response.json();
    this.setState({
      clickedCompanyData: [...body]
    });
  };

  handleRatioPost = async () => {
    // e.preventDefault();
    const response = await fetch("http://localhost:5000/api/ratios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ post: this.state.clickedCompany.ticker })
    });
    const body = await response.json();
    // console.log(body);
    this.setState({
      clickedCompanyRatios: body
    });
  };

  handleChange = event => {
    // console.log("Changing")
    // console.log (event.target.name)
    this.setState({
      inputValue: event.target.value
    });
  };

  filterCompanies = () =>
    this.props.companies.filter(item => {
      return (
        item.name.toLowerCase().includes(this.state.inputValue.toLowerCase()) ||
        item.ticker
          .toLowerCase()
          .includes(this.state.inputValue.toLowerCase()) ||
        item.exchange
          .toLowerCase()
          .includes(this.state.inputValue.toLowerCase())
      );
    });

  showFinancialSummaryPage = () => {
    // console.log("dhowing Details page");
    this.setState({
      companyFinancialSummary: !this.state.companyFinancialSummary
    });
  };

  render() {
    // console.log("Companies Container State", this.state);
    return (
      <div>
        {!this.state.companyFinancialSummary ? (
          <Segment inverted>
            <Search
              handleChange={this.handleChange}
              inputValue={this.state.inputValue}
            />
            <CompanyList
              showFinancialSummaryPage={this.showFinancialSummaryPage}
              companies={this.filterCompanies()}
              handleClickedCompanyPost={this.handleClickedCompanyPost}
              handleCompanyFinancials={this.handleCompanyFinancials}
              handleRatioPost={this.handleRatioPost}
            />
          </Segment>
        ) : (
          <Segment inverted>
            <Label as="a" corner="right" color="blue">
              <Icon
                name="remove"
                onClick={() => this.showFinancialSummaryPage()}
              />
            </Label>
            <FinancialsSummaryContainer
              companies={this.props.companies}
              clickedCompanyData={this.state.clickedCompanyData}
              clickedCompanyRatios={this.state.clickedCompanyRatios}
              handleClickedCompanyPost={this.handleClickedCompanyPost}
              handleCompanyFinancials={this.handleCompanyFinancials}
              handleRatioPost={this.handleRatioPost}
              showFinancialSummaryPage={this.showFinancialSummaryPage}
            />
          </Segment>
        )}
      </div>
    );
  }
}
