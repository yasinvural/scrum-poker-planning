const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const router = require("./router");
const {
  updateStoryPoint,
  updateActiveVoter,
  setFinalStoryPoint,
} = require("./planning");

const port = 4000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(cors());
app.use(router);

io.on("connection", (socket) => {
  console.log("connect");

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

  socket.on("disconnect", () => {
    console.log("disconnect");
  });
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
