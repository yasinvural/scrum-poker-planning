import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import ActiveStory from "../components/ActiveStory/ActiveStory";

describe("ActiveStory", () => {
  it("renders without crash", () => {
    const { getByTestId } = render(
      <ActiveStory
        socket={{ id: "123", emit: () => {} }}
        activeStory={{ name: "active story1" }}
        sessionName="active planning 1"
        voterName="Scrum Master"
      />
    );
    const activeStoryContainer = getByTestId("active-story-container");
    expect(activeStoryContainer).toBeInTheDocument();
  });
  
  it("initial vote info text", () => {
    const { container } = render(
      <ActiveStory
        socket={{ id: "123", emit: () => {} }}
        activeStory="active story1"
        sessionName="active planning 1"
        voterName="Scrum Master"
      />
    );
    const voteInfo = getByTestId(container, "vote-info");
    expect(voteInfo.textContent).toBe("Please Vote !!!");
  });
  
  it("selected story point as 13, and check vote info text", () => {
    const { container } = render(
      <ActiveStory
        socket={{ id: "123", emit: () => {} }}
        activeStory="active story1"
        sessionName="active planning 1"
        voterName="Scrum Master"
      />
    );
    const storyPoint = getByTestId(container, "story-point-13");
    fireEvent.click(storyPoint);
    const voteInfo = getByTestId(container, "vote-info");
    expect(voteInfo.textContent).toBe("13 Voted");
  });
});
