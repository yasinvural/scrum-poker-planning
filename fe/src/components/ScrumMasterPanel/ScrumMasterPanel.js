import React from "react";
import "./ScrumMasterPanel.css";
import { Card } from "antd";

const ScrumMasterPanel = ({ activeStoryName, name, voterList }) => {
  return (
    <Card className="scrum-master-panel-container" title={name}>
      <div>{activeStoryName} is active</div>
      <div className="voter-list-container">
        {voterList.map((voter) => (
          <div className="voter-name-container" key={voter.name}>
            <div>{voter.name}</div>
            <div>:</div>
            <div>{voter.point || "Not Voted"}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ScrumMasterPanel;
