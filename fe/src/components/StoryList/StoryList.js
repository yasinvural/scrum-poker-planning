import React, { useState, useEffect } from "react";
import "./StoryList.css";
import { Button, Input, InputNumber } from "antd";

const { TextArea } = Input;

const StoryList = () => {
  const [sessionName, setSessionName] = useState("");
  const [numOfVoters, setNumOfVoters] = useState(1);
  const [storyList, setStoryList] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isInputsValid, setIsInputsValid] = useState({
    sessionNameValid: false,
    numOfVotersValid: true,
    storyListValid: false,
  });

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
    console.log({ sessionName: sessionName.trim(), numOfVoters, storyList });
  };

  return (
    <div className="story-list-container">
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

export default StoryList;
