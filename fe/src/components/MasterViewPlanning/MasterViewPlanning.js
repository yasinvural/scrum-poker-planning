import React, { useState, useEffect } from "react";
import "./MasterViewPlanning.css";
import ActiveStory from "../ActiveStory/ActiveStory";
import StoryList from "../StoryList/StoryList";
import ScrumMasterPanel from "../ScrumMasterPanel/ScrumMasterPanel";
import { getPlan } from "../../services/planService";
import { message } from "antd";
import { useParams, useHistory } from "react-router-dom";
import io from "socket.io-client";

const MasterViewPlanning = () => {
  const [storyList, setStoryList] = useState([]);
  const [activeStory, setActiveStory] = useState({});
  const [voterList, setVoterList] = useState([]);
  const [socket, setSocket] = useState(null);
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    async function getStoryList() {
      getPlan(params.session)
        .then((res) => {
          setStoryList(res.data.storyList);
          setActiveStory(res.data.storyList[0]);
          setVoterList(res.data.voterList);
        })
        .catch((err) => {
          message.error(err.response.data);
          history.push("/error");
        });
    }
    getStoryList();
    setSocket(io("http://localhost:4000"));
  }, [params.session]);

  useEffect(() => {
    socket &&
      socket.on("updateScrumMasterPanel", (data) => {
        debugger;
        setVoterList(data.voterList);
      });
  });

  return (
    <div className="view-planning">
      <div className="story-list">
        <StoryList storyList={storyList} />
      </div>
      <div className="active-story">
        <ActiveStory
          activeStory={activeStory}
          socket={socket}
          sessionName={params.session}
          voterName={"Scrum Master"}
        />
      </div>
      <div className="scrum-master-panel">
        <ScrumMasterPanel
          name={"Scrum Master Panel"}
          activeStoryName={activeStory.name}
          voterList={voterList}
        />
      </div>
    </div>
  );
};

export default MasterViewPlanning;
