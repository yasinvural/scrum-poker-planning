import React, { useState, useEffect } from "react";
import "./ActiveStory.css";
import { Card } from "antd";

const storyPoints = [
  "1",
  "2",
  "3",
  "5",
  "8",
  "13",
  "21",
  "34",
  "55",
  "89",
  "134",
  "?",
];

const ActiveStory = ({ activeStory, socket, sessionName, voterName }) => {
  const [selectedStoryPoint, setSelectedStoryPoint] = useState(null);

  useEffect(() => {
    setSelectedStoryPoint(null);
  }, [activeStory.name]);

  useEffect(() => {
    socket.emit("updateStoryPoint", {
      sessionName,
      voterName,
      selectedStoryPoint,
    });
  }, [selectedStoryPoint]);

  const handleSelectStoryPoint = (value) => {
    setSelectedStoryPoint(value);
  };

  return (
    <Card className="active-story-container" title={activeStory.name}>
      <div className="story-point-row">
        {storyPoints.map((storyPoint) => (
          <div
            className={storyPoint === selectedStoryPoint ? "selected" : ""}
            key={storyPoint}
            onClick={() => handleSelectStoryPoint(storyPoint)}
          >
            {storyPoint}
          </div>
        ))}
      </div>
      <div className="vote-info">
        {selectedStoryPoint
          ? `${selectedStoryPoint} Voted`
          : "Please Vote !!! "}
      </div>
    </Card>
  );
};

export default ActiveStory;
