import React from "react";
import { Link } from "react-router-dom";
import {
  AppLayoutPage,
  Datalist,
  DatalistRow,
  DatalistCol,
  DatalistColActions,
  PageHeader,
  Button,
  Icon,
} from "saagie-ui/react";

export class TreeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      achievements: [],
    };

    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch("/api/achievements")
      .then((body) => body.json())
      .then((achievements) => {
        this.setState({
          achievements,
          hideUnlocked: false,
        });
      });
  }
  handleHiding() {
    this.setState({ hideUnlocked: !this.state.hideUnlocked });
  }
  handleUnlocking(id) {
    console.log(id);
    console.log(this.state.achievements);

    if (this.state.achievements[id].unlocked) {
      let confirmAction = window.confirm(
        "Are you sure you wanna lock this achievement again ?"
      );
      if (confirmAction === false) {
        return;
      }
    }
    fetch(`/api/achievement/${id}/unlock`, { method: "POST" }).then(
      (response) => console.log(response.status)
    );

    this.setState((prevState) => ({
      achievements: prevState.achievements.map((achievement) =>
        achievement.id === id
          ? Object.assign(achievement, { unlocked: !achievement.unlocked })
          : achievement
      ),
    }));
  }

  render() {
    const { achievements } = this.state;

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
            <PageHeader title="SaagieVements">
              <Link to="/tree-view" className="sui-a-button as--default">
                Tree view
              </Link>
              <Link to="/new-achievement" className="sui-a-button as--primary">
                New achievement
              </Link>
            </PageHeader>
            <h3>I had fun unlocking the following achievements</h3>
            <Datalist
              isHover
              className={this.state.hideUnlocked ? "hideUnlocked" : ""}
            >
              {achievements.map((achievement) => (
                <DatalistRow
                  key={achievement.goal}
                  onClick={() => {
                    this.handleUnlocking(achievement.id);
                  }}
                  className={achievement.unlocked ? "unlocked" : ""}
                >
                  <DatalistCol isLink level="primary">
                    {achievement.goal}
                  </DatalistCol>
                  <DatalistColActions size="xs">
                    <Icon
                      style={{ opacity: achievement.unlocked ? 1 : 0.4 }}
                      name={
                        achievement.unlocked ? "fa-trophy" : "fa-times-circle"
                      }
                      size="xl"
                    />
                  </DatalistColActions>
                </DatalistRow>
              ))}
            </Datalist>
            <div className="sui-g-grid as--end  as--middle as--auto as--gutter-sm">
              <div className="sui-g-grid__item">
                <Button
                  size="xs"
                  onClick={() => {
                    this.handleHiding();
                  }}
                >
                  {this.state.hideUnlocked
                    ? "Show unlocked achievements"
                    : "Hide unlocked achievements"}
                </Button>
              </div>
            </div>
          </AppLayoutPage>
        </div>
      </div>
    );
  }
}
