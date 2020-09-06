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
  return <Table dataSource={storyList} columns={columns} />;
};

export default StoryList;
