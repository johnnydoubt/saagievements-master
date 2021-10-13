import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppLayoutPage,
  Datalist,
  DatalistRow,
  DatalistCol,
  DatalistColActions,
  PageHeader,
  Icon,
} from 'saagie-ui/react';

export class Achievements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      achievements: [],
    };
  }

  componentDidMount() {
    fetch('/api/achievements')
      .then((body) => body.json())
      .then((achievements) => {
        this.setState({
          achievements,
        });
      });
  }

  render() {
    const {
      achievements,
    } = this.state;

    return (
      <div className="sui-l-app-layout">
        <div className="sui-l-app-layout__subapp">
          <AppLayoutPage>
            <PageHeader title="SaagieVements">
              <Link to="/new-achievement" className="sui-a-button as--primary">
                New achievement
              </Link>
            </PageHeader>
            <h3>
              Have fun to unlock the following achievements
            </h3>
            <Datalist isHover>
              {achievements.map((achievement) => (
                <DatalistRow
                  key={achievement.goal}
                >
                  <DatalistCol isLink level="primary">
                    {achievement.goal}
                  </DatalistCol>
                  <DatalistColActions size="xs">
                    <Icon style={{ opacity: achievement.unlocked ? 1 : 0.4 }} name={achievement.unlocked ? 'fa-trophy' : 'fa-times-circle'} size="xl" />
                  </DatalistColActions>
                </DatalistRow>
              ))}
            </Datalist>
          </AppLayoutPage>
        </div>
      </div>
    );
  }
}
