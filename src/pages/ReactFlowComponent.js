import React from "react";
import ReactFlow from "react-flow-renderer";

export class ReactFlowComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ height: 600 }}>
        <ReactFlow elements={this.props.nodes} />
      </div>
    );
  }
}
