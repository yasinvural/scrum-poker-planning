import React from "react";
import { render, fireEvent } from "@testing-library/react";

import AddStoryList from "../components/AddStoryList/AddStoryList";

describe("AddStoryList Component", () => {
  it("renders without crash", () => {
    const { getByTestId } = render(<AddStoryList />);
    const addStoryListContainer = getByTestId("add-story-list");
    expect(addStoryListContainer).toBeInTheDocument();
  });

  it("initial values correct", () => {
    const { getByTestId } = render(<AddStoryList />);
    const sessionName = getByTestId("session-name");
    const numOfVoters = getByTestId("num-of-voters");
    const storyList = getByTestId("story-list");
    const startSessionButton = getByTestId("start-session-button");
    expect(sessionName.textContent).toBe("");
    expect(numOfVoters.value).toBe("1");
    expect(storyList.textContent).toBe("");
    expect(startSessionButton).toBeDisabled();
  });

  it("AddStoryList Component form value changes", () => {
    const mockSessionName = "first plan";
    const mockNumOfVoters = 5;
    const mockStoryList = "Story1\nStory2\nStory3";
    const { getByTestId } = render(<AddStoryList />);
    const addStoryListContainer = getByTestId("add-story-list");
    const sessionName = getByTestId("session-name");
    const numOfVoters = getByTestId("num-of-voters");
    const storyList = getByTestId("story-list");
    const startSessionButton = getByTestId("start-session-button");
    sessionName.value = mockSessionName;
    fireEvent.change(sessionName);
    numOfVoters.value = mockNumOfVoters;
    fireEvent.change(numOfVoters);
    storyList.value = mockStoryList;
    fireEvent.change(storyList);
    expect(sessionName.value).toBe(mockSessionName);
    expect(numOfVoters.value).toBe(mockNumOfVoters.toString());
    expect(storyList.value).toBe(mockStoryList);
  });

  it("button click", () => {
    const { getByTestId } = render(<AddStoryList />);
    const addStoryListContainer = getByTestId("add-story-list");
    const startSessionButton = getByTestId("start-session-button");
    fireEvent.click(startSessionButton);
    expect(addStoryListContainer).toBeInTheDocument();
  });
});
