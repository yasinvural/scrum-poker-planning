import React from "react";
import "./StoryList.css";
import { Button, Input, InputNumber } from "antd";

const { TextArea } = Input;

const StoryList = () => {
  return (
    <div className="story-list-container">
      <div className="header-info">
        <div className="session-name-container">
          <div className="title">Session Name </div>
          <Input placeholder="Enter Session Name" />
        </div>
        <div className="voters-container">
          <div className="title">Number of voters</div>
          <InputNumber placeholder="Enter Number of Voters" min={1} />
        </div>
      </div>
      <div className="text-area-container">
        <TextArea rows={8} />
      </div>
      <div className="start-session-button">
        <Button type="primary">Start Session</Button>
      </div>
    </div>
  );
};

export default StoryList;
