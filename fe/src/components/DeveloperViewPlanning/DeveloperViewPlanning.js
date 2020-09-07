import React, { useState, useEffect } from "react";
import "./DeveloperViewPlanning.css";
import ActiveStory from "../ActiveStory/ActiveStory";
import StoryList from "../StoryList/StoryList";
import { getPlanBySessionName } from "../../services/planService";
import { message } from "antd";
import { useParams, useHistory } from "react-router-dom";
import { status } from "../../constants/status";
import io from "socket.io-client";

const DeveloperViewPlanning = () => {
  const [storyList, setStoryList] = useState([]);
  const [activeStory, setActiveStory] = useState({});
  const [voterName, setVoterName] = useState("");
  const [socket, setSocket] = useState(null);
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
          setActiveStory(activeStory);
          const voter = res.data.voterList.find((voter) => !voter.active);
          voter && setVoterName(voter.name);
        })
        .catch((err) => {
          message.error(err.response.data);
          history.push("/error");
        });
    }
    fetchPlan();
    setSocket(io("http://localhost:4000"));
  }, [params.session]);

  useEffect(() => {
    socket &&
      socket.emit("updateActiveVoter", {
        voterName,
        sessionName: params.session,
      });
  });

  useEffect(() => {
    socket &&
      socket.on("updateScrumMasterPanel", (data) => {
        setStoryList(data.storyList);
        const activeStory = data.storyList.find(
          (story) => story.status === status.ACTIVE
        );
        activeStory && setActiveStory(activeStory);
      });
  });

  return (
    <div className="developer-view-planning">
      <div className="story-list">
        <StoryList storyList={storyList} />
      </div>
      {voterName && (
        <div className="active-story">
          <ActiveStory
            activeStory={activeStory}
            socket={socket}
            sessionName={params.session}
            voterName={voterName}
          />
        </div>
      )}
    </div>
  );
};

export default DeveloperViewPlanning;
