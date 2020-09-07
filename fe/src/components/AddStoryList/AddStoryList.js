import React, { useState, useEffect } from "react";
import "./AddStoryList.css";
import { useHistory } from "react-router-dom";
import { Button, Input, InputNumber, message } from "antd";
import { createPlan } from "../../services/planService";

const { TextArea } = Input;

const AddStoryList = () => {
  const [sessionName, setSessionName] = useState("planning");
  const [numOfVoters, setNumOfVoters] = useState(3);
  const [storyList, setStoryList] = useState("story1\nstory2\nstory3");
  const [isFormValid, setIsFormValid] = useState(true);
  const [isInputsValid, setIsInputsValid] = useState({
    sessionNameValid: true,
    numOfVotersValid: true,
    storyListValid: true,
  });
  const history = useHistory();

  useEffect(() => {
    const {
      sessionNameValid,
      numOfVotersValid,
      storyListValid,
    } = isInputsValid;
    if (sessionNameValid && numOfVotersValid && storyListValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [isInputsValid]);

  const handleSessionName = (e) => {
    if (e.target.value.trim().length > 0) {
      setIsInputsValid((prevState) => {
        return { ...prevState, sessionNameValid: true };
      });
    } else {
      setIsInputsValid((prevState) => {
        return { ...prevState, sessionNameValid: false };
      });
    }
    setSessionName(e.target.value);
  };

  const handleNumOfVoters = (value) => {
    if (typeof value === "string" || value === "" || value === null) {
      setIsInputsValid((prevState) => {
        return { ...prevState, numOfVotersValid: false };
      });
    } else {
      setIsInputsValid((prevState) => {
        return { ...prevState, numOfVotersValid: true };
      });
    }
    setNumOfVoters(value);
  };

  const handleStoryList = (e) => {
    if (e.target.value.trim().length > 0) {
      setIsInputsValid((prevState) => {
        return { ...prevState, storyListValid: true };
      });
    } else {
      setIsInputsValid((prevState) => {
        return { ...prevState, storyListValid: false };
      });
    }
    setStoryList(e.target.value);
  };

  const handleStartSession = () => {
    const stories = storyList.split("\n");
    createPlan({ sessionName, numOfVoters, stories })
      .then((data) => {
        history.push(`/master/${data.data}`);
      })
      .catch((err) => {
        message.error(err.response.data);
      });
  };

  return (
    <div className="add-story-list-container">
      <div className="header-info">
        <div className="session-name-container">
          <div className="title">Session Name </div>
          <Input
            placeholder="Enter Session Name"
            value={sessionName}
            maxLength={200}
            onChange={handleSessionName}
          />
        </div>
        <div className="voters-container">
          <div className="title">Number of voters</div>
          <InputNumber
            placeholder="Enter Number of Voters"
            min={1}
            value={numOfVoters}
            onChange={handleNumOfVoters}
          />
        </div>
      </div>
      <div className="text-area-container">
        <TextArea rows={8} value={storyList} onChange={handleStoryList} />
      </div>
      <div className="start-session-button">
        <Button
          type="primary"
          disabled={!isFormValid}
          onClick={handleStartSession}
        >
          Start Session
        </Button>
      </div>
    </div>
  );
};

export default AddStoryList;
