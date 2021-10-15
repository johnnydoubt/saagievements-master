import React from "react";
import { Link } from "react-router-dom";
import {
  AppLayoutPage,
  PageHeader,
} from "saagie-ui/react";

import { ReactFlowComponent } from "../pages/ReactFlowComponent";

export class TreeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      achievements: [],
    };

    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch("/api/tree")
      .then((body) => body.json())
      .then((achievements) => {
        
        this.setState({
          achievements,
        });
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
            <PageHeader title="Tree view">
              <Link to="/" className="sui-a-button as--default">
                Classic view
              </Link>
              <Link to="/new-achievement" className="sui-a-button as--primary">
                New achievement
              </Link>
            </PageHeader>
            <h3>I had fun unlocking the following achievements</h3>
            <ReactFlowComponent nodes={this.state.achievements} />
          </AppLayoutPage>
        </div>
      </div>
    );
  }
}
