import React, { useState, useEffect } from "react";
import "./AddStoryList.css";
import { useHistory } from "react-router-dom";
import { Button, Input, InputNumber, message } from "antd";
import { createPlan } from "../../services/planService";

const { TextArea } = Input;

const AddStoryList = () => {
  const [sessionName, setSessionName] = useState("");
  const [numOfVoters, setNumOfVoters] = useState(1);
  const [storyList, setStoryList] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isInputsValid, setIsInputsValid] = useState({
    sessionNameValid: false,
    numOfVotersValid: true,
    storyListValid: false,
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
    <div className="add-story-list-container" data-testid="add-story-list">
      <div className="header-info">
        <div className="session-name-container">
          <div className="title">Session Name </div>
          <Input
            data-testid="session-name"
            placeholder="Enter Session Name"
            value={sessionName}
            maxLength={200}
            onChange={handleSessionName}
          />
        </div>
        <div className="voters-container">
          <div className="title">Number of voters</div>
          <InputNumber
            data-testid="num-of-voters"
            placeholder="Enter Number of Voters"
            min={1}
            value={numOfVoters}
            onChange={handleNumOfVoters}
          />
        </div>
      </div>
      <div className="text-area-container">
        <TextArea
          data-testid="story-list"
          rows={8}
          value={storyList}
          onChange={handleStoryList}
        />
      </div>
      <div className="start-session-button">
        <Button
          data-testid="start-session-button"
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
