const {
  updateStoryPoint,
  updateActiveVoter,
  setFinalStoryPoint,
  getPlanBySessionName,
} = require("./planning");

module.exports = function (socket, io) {
  socket.on(
    "updateStoryPoint",
    ({ sessionName, voterName, selectedStoryPoint }) => {
      const updated = updateStoryPoint({
        sessionName,
        voterName,
        selectedStoryPoint,
      });

      io.emit("updateScrumMasterPanel", updated);
    }
  );

  socket.on("updateActiveVoter", ({ voterName, sessionName }) => {
    if (voterName) {
      updateActiveVoter({ voterName, sessionName });
    }
  });

  socket.on(
    "setFinalStoryPoint",
    ({ sessionName, activeStoryName, finalScore }) => {
      const updated = setFinalStoryPoint({
        sessionName,
        activeStoryName,
        finalScore,
      });
      io.emit("updateScrumMasterPanel", updated);
    }
  );

  // setInterval(() => {
  //   //TODO: find activeStory
  //   const { existingPlan } = getPlanBySessionName("planning");
  //   io.emit("updateScrumMasterPanel", { ...existingPlan });
  // }, 2000);
};
