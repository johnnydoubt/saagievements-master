import React from "react";
import { Link } from "react-router-dom";
import {
  AppLayoutPage,
  PageHeader,
  FormGroup,
} from "saagie-ui/react";

export class NewAchievement extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", valid: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // TODO: enable CORS to use external API - zenquotes as text for FormGroup 'helper' 

  //   componentDidMount() {
  //     fetch("https://zenquotes.io/api/random", {  headers: {
  //         'Access-Control-Allow-Origin':'*'
  //       }})
  //       .then((response) => console.log(response))

  //   }
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
      if (response.status === 303) {
        return window.alert("This exact achievement already exists !");
      }
      window.alert(
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
          <a href="https://www.saagie.com">
              <img
                width="200"
                src="https://www.saagie.com/wp-content/uploads/2020/07/Logo-Web-Retina@2x.png"
                alt="Saagie-logo"
              />
            </a>
            <PageHeader title="New SaagieVement">
              <Link to="/" className="sui-a-button as--default">
                Back to my list
              </Link>
            </PageHeader>
            <h3>State your new achievement in the field below</h3>
            <div className="sui-g-grid as--center">
              <div className="sui-g-grid__item as--1_2">
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
                      required={true}
                      minLength="3"
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
                    <div className="sui-g-grid__item as--pull"></div>
                  </div>
                </form>
              </div>
            </div>
          </AppLayoutPage>
        </div>
      </div>
    );
  }
}
