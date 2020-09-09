import React, { useState } from "react";
import "./StoryList.css";
import { Table } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Story Point",
    dataIndex: "point",
    key: "point",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

const StoryList = ({ storyList }) => {
  if (storyList.length === 0) {
    return <div data-testid="story-list">Loading . . .</div>;
  } else {
    return (
      <Table
        data-testid="story-list"
        dataSource={storyList}
        columns={columns}
      />
    );
  }
};

export default StoryList;
