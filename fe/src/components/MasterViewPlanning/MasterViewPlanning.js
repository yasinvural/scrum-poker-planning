import React, { useState } from "react";
import "./MasterViewPlanning.css";
import ActiveStory from "../ActiveStory/ActiveStory";
import { Table } from "antd";

const mockStoryList = [
  { id: "1", key: "1", name: "Story1", point: null, status: "Active" },
  { id: "2", key: "2", name: "Story2", point: null, status: "Not Voted" },
  { id: "3", key: "3", name: "Story3", point: null, status: "Not Voted" },
  { id: "4", key: "4", name: "Story4", point: null, status: "Not Voted" },
  { id: "5", key: "5", name: "Story5", point: null, status: "Not Voted" },
  { id: "6", key: "6", name: "Story5", point: null, status: "Not Voted" },
];

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

const MasterViewPlanning = () => {
  const [storyList, setStoryList] = useState(mockStoryList);
  const [activeStory, setActiveStory] = useState(mockStoryList[0]);

  return (
    <div className="view-planning">
      <div>
        <Table dataSource={storyList} columns={columns} />
      </div>
      <div>
        <ActiveStory activeStory={activeStory} />
      </div>
      <div>Scrum Master Panel</div>
    </div>
  );
};

export default MasterViewPlanning;
