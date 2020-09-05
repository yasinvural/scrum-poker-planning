import React, { useState } from "react";
import "./MasterViewPlanning.css";
import ActiveStory from "../ActiveStory/ActiveStory";

const mockStoryList = [
  { id: "1", name: "Story1", point: null, status: "Active" },
  { id: "2", name: "Story2", point: null, status: "Not Voted" },
  { id: "3", name: "Story3", point: null, status: "Not Voted" },
  { id: "4", name: "Story4", point: null, status: "Not Voted" },
  { id: "5", name: "Story5", point: null, status: "Not Voted" },
  { id: "6", name: "Story5", point: null, status: "Not Voted" },
];
const MasterViewPlanning = () => {
  const [storyList, setStoryList] = useState(mockStoryList);
  const [activeStory, setActiveStory] = useState(mockStoryList[0]);

  return (
    <div className="view-planning">
      <div>Story List</div>
      <div>
        <ActiveStory activeStory={activeStory} />
      </div>
      <div>Scrum Master Panel</div>
    </div>
  );
};

export default MasterViewPlanning;
