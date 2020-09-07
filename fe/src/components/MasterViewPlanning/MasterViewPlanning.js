import React, { useState, useEffect } from "react";
import "./MasterViewPlanning.css";
import ActiveStory from "../ActiveStory/ActiveStory";
import StoryList from "../StoryList/StoryList";
import ScrumMasterPanel from "../ScrumMasterPanel/ScrumMasterPanel";
import { getPlanBySessionName } from "../../services/planService";
import { message } from "antd";
import { useParams, useHistory } from "react-router-dom";
import { status } from "../../utils/constants";
import io from "socket.io-client";

const MasterViewPlanning = () => {
  const [storyList, setStoryList] = useState([]);
  const [activeStory, setActiveStory] = useState({});
  const [voterList, setVoterList] = useState([]);
  const [socket, setSocket] = useState(io("http://localhost:4000"));
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchPlan() {
      getPlanBySessionName(params.session)
        .then((res) => {
          setStoryList(res.data.storyList);
          const activeStory = res.data.storyList.find(
            (story) => story.status === status.ACTIVE
          );
          activeStory && setActiveStory(activeStory);
          setVoterList(res.data.voterList);
        })
        .catch((err) => {
          message.error(err.response.data);
          history.push("/error");
        });
    }
    fetchPlan();
  }, [params.session]);

  useEffect(() => {
    socket.on("updateScrumMasterPanel", (data) => {
      setStoryList(data.storyList);
      const activeStory = data.storyList.find(
        (story) => story.status === status.ACTIVE
      );
      activeStory && setActiveStory(activeStory);
      setVoterList(data.voterList);
    });
  }, [socket]);

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
          activeStoryName={activeStory.name}
          socket={socket}
          name={"Scrum Master Panel"}
          sessionName={params.session}
          voterList={voterList}
        />
      </div>
    </div>
  );
};

export default MasterViewPlanning;
