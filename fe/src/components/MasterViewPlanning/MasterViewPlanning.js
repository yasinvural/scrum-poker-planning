import React, { useState, useEffect } from "react";
import "./MasterViewPlanning.css";
import ActiveStory from "../ActiveStory/ActiveStory";
import StoryList from "../StoryList/StoryList";
import { getPlan } from "../../services/planService";
import { message } from "antd";
import { useParams, useHistory } from "react-router-dom";
import io from "socket.io-client";

const MasterViewPlanning = () => {
  const [storyList, setStoryList] = useState([]);
  const [activeStory, setActiveStory] = useState({});
  const [socket, setSocket] = useState(null);
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    async function getStoryList() {
      getPlan(params.session)
        .then((res) => {
          setStoryList(res.data.storyList);
          setActiveStory(res.data.storyList[0]);
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
        setStoryList(data.storyList);
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
        />
      </div>
      <div className="scrum-master-panel">Scrum Master Panel</div>
    </div>
  );
};

export default MasterViewPlanning;
