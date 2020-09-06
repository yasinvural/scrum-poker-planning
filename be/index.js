const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const router = require("./router");
const { updateVoterList } = require("./planning");

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
    ({ sessionName, voterName, selectedStoryPoint, activeStoryId }) => {
      const updated = updateVoterList({
        sessionName,
        voterName,
        activeStoryId,
        selectedStoryPoint,
      });

      socket.emit("updateScrumMasterPanel", updated);
      socket.broadcast.emit("updateScrumMasterPanel", updated);
    }
  );

  socket.on("disconnect", () => {
    console.log("disconnect");
  });
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
