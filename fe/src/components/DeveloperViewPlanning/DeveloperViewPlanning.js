import React, { useState, useEffect } from "react";
import "./DeveloperViewPlanning.css";
import ActiveStory from "../ActiveStory/ActiveStory";
import StoryList from "../StoryList/StoryList";
import { getPlanBySessionName } from "../../services/planService";
import { message } from "antd";
import { useParams, useHistory } from "react-router-dom";
import { status } from "../../utils/constants";
import io from "socket.io-client";

const DeveloperViewPlanning = () => {
  const [storyList, setStoryList] = useState([]);
  const [activeStory, setActiveStory] = useState({});
  const [voterName, setVoterName] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
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
  }, [params.session]);

  useEffect(() => {
    socket.emit("updateActiveVoter", {
      voterName,
      sessionName: params.session,
    });
  });

  useEffect(() => {
    socket.on("updateScrumMasterPanel", (data) => {
      setStoryList(data.storyList);
      const activeStory = data.storyList.find(
        (story) => story.status === status.ACTIVE
      );
      const isCompleted = data.storyList.every(
        (story) => story.status === status.VOTED
      );
      setIsCompleted(isCompleted);
      activeStory && setActiveStory(activeStory);
    });
  }, [socket]);

  return (
    <>
      <div
        className={
          isCompleted
            ? "developer-view-planning completed"
            : "developer-view-planning"
        }
      >
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
      {isCompleted && (
        <div className="completed-text">{params.session} is completed !</div>
      )}
    </>
  );
};

export default DeveloperViewPlanning;
