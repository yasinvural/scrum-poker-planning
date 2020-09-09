import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import ScrumMasterPanel from "../components/ScrumMasterPanel/ScrumMasterPanel";

describe("ScrumMasterPanel", () => {
  it("renders without crash", () => {
    const mockVoterList = [{ name: "Voter 1", point: null, active: true }];
    const { getByTestId } = render(
      <ScrumMasterPanel
        socket={{ id: "123", emit: () => {} }}
        activeStoryName={"active story1"}
        name={"Scrum Master Panel"}
        voterList={mockVoterList}
        socket={{ id: "123", emit: () => {} }}
        sessionName={"Planning 1"}
      />
    );
    const scrumMasterPanel = getByTestId("scrum-master-panel");
    expect(scrumMasterPanel).toBeInTheDocument();
  });

  it("initial voter status text", () => {
    const mockVoterList = [{ name: "Voter 1", point: null, active: true }];
    const { container } = render(
      <ScrumMasterPanel
        socket={{ id: "123", emit: () => {} }}
        activeStoryName={"active story1"}
        name={"Scrum Master Panel"}
        voterList={mockVoterList}
        socket={{ id: "123", emit: () => {} }}
        sessionName={"Planning 1"}
      />
    );
    const voteStatus = getByTestId(container, "vote-status-0");
    expect(voteStatus.textContent).toBe("Not Voted");
  });
});
