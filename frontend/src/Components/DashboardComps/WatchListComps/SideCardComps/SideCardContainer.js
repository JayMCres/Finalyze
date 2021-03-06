import React, { Component } from "react";
import { Segment, Message, Icon } from "semantic-ui-react";
// import CompanySideCard from "./CompanySideCard";

import SideCardHeader from "./SideCardHeader";
import SideCardValues from "./SideCardValues";
import SideCardButton from "./SideCardButton";

export default class SideCardContainer extends Component {
  render() {
    // console.log("Sidecard Data", this.props);
    if (
      this.props.companyProfile.length === 0 &&
      this.props.clickedTicker === null
    ) {
      return (
        <Message icon>
          <Icon name="circle notched" loading />
          <Message.Content>
            <Message.Header>NO COMPANY SELECTED</Message.Header>
            Choose Company Please
          </Message.Content>
        </Message>
      );
    } else {
      return (
        <div>
          {this.props.companyProfile.length === 0 ? (
            <Segment attached="top" style={{ "background-color": "#3333cc" }}>
              <Message>{this.props.clickedTicker.name}</Message>
              <SideCardButton
                displayCompanyDetailPage={this.props.displayCompanyDetailPage}
              />
            </Segment>
          ) : (
            <div>
              <Segment attached="top" style={{ "background-color": "#6666ff" }}>
                {[this.props.companyProfile].map(item => {
                  return <SideCardHeader {...item} />;
                })}
              </Segment>
              {this.props.valuationMetrics.length !== 0 ? (
                <div>
                  <Segment attached="middle">
                    {[this.props.valuationMetrics].map(item => {
                      return <SideCardValues {...item} />;
                    })}
                  </Segment>
                  <Segment
                    attached="bottom"
                    style={{ "background-color": "#6666ff" }}
                  >
                    <SideCardButton
                      displayCompanyDetailPage={
                        this.props.displayCompanyDetailPage
                      }
                      // fetchAnnualIS={this.props.fetchAnnualIS}
                    />
                  </Segment>
                </div>
              ) : null}
            </div>
          )}
        </div>
      );
    }
  }
}
