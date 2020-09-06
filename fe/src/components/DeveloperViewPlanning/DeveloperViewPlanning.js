import React, { useState, useEffect } from "react";
import "./DeveloperViewPlanning.css";
import ActiveStory from "../ActiveStory/ActiveStory";
import StoryList from "../StoryList/StoryList";
import { getPlan } from "../../services/planService";
import { message } from "antd";
import { useParams, useHistory } from "react-router-dom";
import io from "socket.io-client";

const DeveloperViewPlanning = () => {
  const [storyList, setStoryList] = useState([]);
  const [activeStory, setActiveStory] = useState({});
  const [voterName, setVoterName] = useState("");
  const [socket, setSocket] = useState(null);
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    async function getStoryList() {
      getPlan(params.session)
        .then((res) => {
          setStoryList(res.data.storyList);
          setActiveStory(res.data.storyList[0]);
          const voter = res.data.voterList.find((voter) => !voter.active);
          voter && setVoterName(voter.name);
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
      socket.emit("updateActiveVoter", {
        voterName,
        sessionName: params.session,
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
