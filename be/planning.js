const planList = [];

const addPlan = ({ sessionName, numOfVoters, storyList }) => {
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

  if (storyList.length === 0) {
    return { error: "It should be at least 1 story" };
  }

  const existingPlan = planList.find(
    (plan) => plan.sessionName === sessionName
  );
  if (existingPlan) return { error: "This plan was created before" };

  const list = storyList.map((story, index) => {
    return {
      id: index + 1,
      key: index + 1,
      name: story,
      point: null,
      status: index === 0 ? "Active" : "Not Voted",
    };
  });

  const newPlan = { sessionName, numOfVoters, list };
  planList.push(newPlan);
  return { sessionName };
};

const getPlan = (sessionName) => {
  if (!sessionName) {
    return { error: "Session name is required" };
  }
  const existingPlan = planList.find(
    (plan) => plan.sessionName === sessionName
  );
  if (!existingPlan) return { error: "The plan not found" };

  return { existingPlan };
};

module.exports = { addPlan, getPlan };
