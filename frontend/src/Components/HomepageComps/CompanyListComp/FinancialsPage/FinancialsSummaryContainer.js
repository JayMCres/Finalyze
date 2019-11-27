import React, { Component } from "react";
import { Grid, Segment } from "semantic-ui-react";
import ShortFormTickerList from "./CompanyList/ShortFormTickerList";
import CompanyContainer from "./CompanySummary/CompanyContainer";
export default class FinancialSummaryContainer extends Component {
  render() {
    return (
      <Grid columns={2} textAlign="center">
        {/* <Divider vertical>Or</Divider> */}
        <Grid.Row>
          <Grid.Column width={6} color="black">
            <Segment inverted style={{ overflow: "auto", maxHeight: 950 }}>
              <ShortFormTickerList companies={this.props.companies} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={10} color="black">
            <CompanyContainer
              clickedCompanyData={this.props.clickedCompanyData}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
