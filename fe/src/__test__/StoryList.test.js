import React from "react";
import { render, fireEvent } from "@testing-library/react";
import StoryList from "../components/StoryList/StoryList";

describe("StoryList", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it("renders table with data", () => {
    const mockStoryListData = [
      { id: 1, key: 1, name: "Story 1", point: null, status: "Active" },
      { id: 2, key: 2, name: "Story 2", point: null, status: "Not Voted" },
      { id: 3, key: 3, name: "Story 3", point: null, status: "Not Voted" },
      { id: 4, key: 4, name: "Story 4", point: null, status: "Not Voted" },
      { id: 5, key: 5, name: "Story 5", point: null, status: "Not Voted" },
      { id: 6, key: 6, name: "Story 6", point: null, status: "Not Voted" },
      { id: 7, key: 7, name: "Story 7", point: null, status: "Not Voted" },
      { id: 8, key: 8, name: "Story 8", point: null, status: "Not Voted" },
      { id: 9, key: 9, name: "Story 9", point: null, status: "Not Voted" },
      { id: 10, key: 10, name: "Story 10", point: null, status: "Not Voted" },
      { id: 11, key: 11, name: "Story 11", point: null, status: "Not Voted" },
    ];
    const { getByTestId } = render(<StoryList storyList={mockStoryListData} />);
    const storyList = getByTestId("story-list");
    expect(storyList).toBeInTheDocument();
  });

  it("not render table because of empty story list array", () => {
    const mockStoryListData = [];
    const { getByTestId } = render(<StoryList storyList={mockStoryListData} />);
    const storyList = getByTestId("story-list");
    expect(storyList.textContent).toBe("Loading . . .");
  });
});
