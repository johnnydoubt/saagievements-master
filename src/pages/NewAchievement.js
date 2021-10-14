// TODO: add a form to create new achievement
import React from "react";
import { Link } from "react-router-dom";
import { AppLayoutPage, PageHeader, FormGroup, Container, Icon } from "saagie-ui/react";

export class NewAchievement extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", valid: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let valid = event.target.value.length >= 3;
    this.setState({ value: event.target.value, valid: valid });
  }

  handleSubmit(event) {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goal: this.state.value }),
    };

    fetch(`/api/achievement`, requestOptions).then((response) => {
      console.log(response.status);
      if (response.status === 303) {
        return window.alert("This exact achievement already exists !");
      }
      alert(
        `Your achievement "${this.state.value}" has been successfully added to the list !`
      );

      this.setState({ value: "" });
    });
  }

  render() {
    return (
      <div className="sui-l-app-layout">
        <div className="sui-l-app-layout__subapp">
          <AppLayoutPage>
            <PageHeader title="New SaagieVement">
              <Link to="/" className="sui-a-button as--primary">
                Back to my list
              </Link>
            </PageHeader>
            <h3>State your new achievement in the field below</h3>
              <form onSubmit={this.handleSubmit}>
                <FormGroup
                  label="Enter a new goal"
                  helper="Inspire yourself !"
                  validationState={this.state.valid ? "success" : "warning"}
                  feedbackMessage={
                    !this.state.valid &&
                    "Your achievement need at least 3 characters"
                  }
                >
                  <input
                    type="text"
                    className="sui-a-form-control"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <div className="sui-g-grid as--auto">
                  <div className="sui-g-grid__item">
                    <button
                      type="submit"
                      className="sui-a-button as--block as--primary"
                    >
                      Confirm
                    </button>
                  </div>
                  <div className="sui-g-grid__item as--pull">
                    <button className="sui-a-button as--block">Cancel</button>
                  </div>
                </div>
              </form>
          </AppLayoutPage>
        </div>
      </div>
    );
  }
}
