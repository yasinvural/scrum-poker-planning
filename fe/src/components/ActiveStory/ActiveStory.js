import React, { useState, useEffect } from "react";
import "./ActiveStory.css";
import { Card } from "antd";
import io from "socket.io-client";

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
let socket;
const ActiveStory = ({ activeStory }) => {
  const [selectedStoryPoint, setSelectedStoryPoint] = useState(null);

  useEffect(() => {
    socket = io("http://localhost:4000");
    const num = Math.random() * 10 + 1;
    socket.emit("test", { name: `Voter ${num}`, selectedStoryPoint });
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
