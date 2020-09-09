import React, { useState, useMemo } from "react";
import "./ScrumMasterPanel.css";
import { Card, InputNumber, Button } from "antd";
import { status } from "../../utils/constants";

const ScrumMasterPanel = ({
  activeStoryName,
  name,
  voterList,
  socket,
  sessionName,
}) => {
  const [finalScore, setFinalScore] = useState(null);
  const handleEndVoting = () => {
    socket.emit("setFinalStoryPoint", {
      sessionName,
      activeStoryName,
      finalScore,
    });
    setFinalScore(null);
  };

  const isVoteEnd = useMemo(() => {
    return voterList.every((voter) => voter.point);
  }, [voterList]);

  return (
    <Card
      data-testid="scrum-master-panel"
      className="scrum-master-panel-container"
      title={name}
    >
      <div className="status">{activeStoryName} is active</div>
      <div className="voter-list-container">
        {voterList.map((voter, index) => (
          <div
            className="voter-name-container"
            key={voter.name}
            testid="voter-name-container"
          >
            <div>{voter.name}</div>
            <div className="column">:</div>
            <div data-testid={`vote-status-${index}`}>
              {isVoteEnd
                ? voter.point
                : voter.point
                ? status.VOTED
                : status.NOT_VOTED}
            </div>
          </div>
        ))}
      </div>
      {isVoteEnd && (
        <div className="final-score" data-testid="final-score-container">
          <div className="text">Final Score</div>
          <div className="input">
            <InputNumber
              data-testid="final-score"
              min={1}
              value={finalScore}
              onChange={setFinalScore}
            />
          </div>
        </div>
      )}

      <div className="end-voting-button">
        <Button
          type="primary"
          disabled={!isVoteEnd || !finalScore}
          onClick={handleEndVoting}
        >
          End Voting For {activeStoryName}
        </Button>
      </div>
    </Card>
  );
};

export default ScrumMasterPanel;
