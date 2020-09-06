import React, { useState, useEffect } from "react";
import "./MasterViewPlanning.css";
import ActiveStory from "../ActiveStory/ActiveStory";
import StoryList from "../StoryList/StoryList";
import { getPlan } from "../../services/planService";
import { useParams, useHistory } from "react-router-dom";

const MasterViewPlanning = () => {
  const [storyList, setStoryList] = useState([]);
  const [activeStory, setActiveStory] = useState({});
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    async function getStoryList() {
      getPlan(params.session)
        .then((res) => {
          setStoryList(res.data.list);
          setActiveStory(res.data.list[0]);
        })
        .catch((err) => {
          console.error(err);
          history.push("/error");
        });
    }
    getStoryList();
  }, [params.session]);

  return (
    <div className="view-planning">
      <div className="story-list">
        <StoryList storyList={storyList} />
      </div>
      <div className="active-story">
        <ActiveStory activeStory={activeStory} />
      </div>
      <div className="scrum-master-panel">Scrum Master Panel</div>
    </div>
  );
};

export default MasterViewPlanning;
