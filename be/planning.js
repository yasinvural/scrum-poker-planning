const planList = [];

const createPlan = ({ sessionName, numOfVoters, stories }) => {
  if (!sessionName) {
    return { error: "Session name is required" };
  }
  if (sessionName.trim.length > 200) {
    return { error: "Session name length should be less than 200 characters." };
  }

  if (!numOfVoters) {
    return { error: "Number of voter is required" };
  }

  if (numOfVoters <= 0) {
    return { error: "Number of voter should be greater than 0" };
  }

  if (stories.length === 0) {
    return { error: "It should be at least 1 story" };
  }

  const existingPlan = planList.find(
    (plan) => plan.sessionName === sessionName
  );
  if (existingPlan) return { error: "This plan was created before" };

  const storyList = stories.map((story, index) => {
    return {
      id: index + 1,
      key: index + 1,
      name: story,
      point: null,
      status: index === 0 ? "Active" : "Not Voted",
    };
  });
  const voterList = Array(numOfVoters)
    .fill("")
    .map((voter, index) => {
      if (index === 0) {
        return {
          id: index + 1,
          name: `Scrum Master`,
          point: null,
          active: true,
        };
      } else {
        return {
          id: index + 1,
          name: `Voter ${index}`,
          point: null,
          active: false,
        };
      }
    });
  const newPlan = { sessionName, voterList, storyList };
  planList.push(newPlan);

  return { sessionName };
};

const getPlanBySessionName = (sessionName) => {
  if (!sessionName) {
    return { error: "Session name is required" };
  }
  const existingPlan = planList.find(
    (plan) => plan.sessionName === sessionName
  );
  if (!existingPlan) return { error: "The plan not found" };

  return { existingPlan };
};

const updateStoryPoint = ({
  sessionName,
  voterName,
  selectedStoryPoint,
}) => {
  const { existingPlan } = getPlanBySessionName(sessionName);
  const activePerson = existingPlan.voterList.find((voter) => {
    return voter.name === voterName;
  });

  activePerson.point = selectedStoryPoint;
  return existingPlan;
};

const updateActiveVoter = ({ voterName, sessionName }) => {
  const { existingPlan } = getPlanBySessionName(sessionName);
  const person = existingPlan.voterList.find((voter) => {
    return voter.name === voterName;
  });
  person.active = true;
};

const setFinalStoryPoint = ({ sessionName, activeStoryName, finalScore }) => {
  const { existingPlan } = getPlanBySessionName(sessionName);
  const activeStory = existingPlan.storyList.find((story) => {
    return story.name === activeStoryName;
  });
  activeStory.point = finalScore;
  activeStory.status = "Voted";
  return existingPlan;
};

module.exports = {
  createPlan,
  getPlanBySessionName,
  updateStoryPoint,
  updateActiveVoter,
  setFinalStoryPoint,
};
