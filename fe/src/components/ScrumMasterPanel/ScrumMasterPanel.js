import React, { useState } from "react";
import "./ScrumMasterPanel.css";
import { Card, InputNumber, Button } from "antd";

const ScrumMasterPanel = ({ activeStoryName, name, voterList }) => {
  const [finalScore, setFinalScore] = useState(null);
  const handleEndVoting = () => {};

  const isVoteEnd = () => {
    return voterList.every((voter) => voter.point);
  };

  return (
    <Card className="scrum-master-panel-container" title={name}>
      <div className="status">{activeStoryName} is active</div>
      <div className="voter-list-container">
        {voterList.map((voter) => (
          <div className="voter-name-container" key={voter.name}>
            <div>{voter.name}</div>
            <div className="column">:</div>
            <div>{voter.point || "Not Voted"}</div>
          </div>
        ))}
      </div>
      {isVoteEnd() && (
        <div className="final-score">
          <div className="text">Final Score</div>
          <div className="input">
            <InputNumber min={1} value={finalScore} onChange={setFinalScore} />
          </div>
        </div>
      )}

      <div className="end-voting-button">
        <Button
          type="primary"
          disabled={!isVoteEnd() || !finalScore}
          onClick={handleEndVoting}
        >
          End Voting For {activeStoryName}
        </Button>
      </div>
    </Card>
  );
};

export default ScrumMasterPanel;
