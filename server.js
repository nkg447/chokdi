const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 4001;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const indexOf = require("lodash/indexOf");
const isEqual = require("lodash/isEqual");
const difference = require("lodash/difference");

app.use(express.static("build"));

const suits = ["H", "S", "C", "D"];
const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const gameData = {};

function valueOf(value) {
  return indexOf(values, value);
}

function calculateWinner(cards, trump) {
  const baseSuit = cards[0].card.suit;
  const trumpCards = cards
    .filter((c) => c.card.suit === trump)
    .sort((c1, c2) => valueOf(c2.card.value) - valueOf(c1.card.value));
  if (trumpCards.length != 0) {
    return trumpCards[0].username;
  }
  const baseCards = cards
    .filter((c) => c.card.suit === baseSuit)
    .sort((c1, c2) => valueOf(c2.card.value) - valueOf(c1.card.value));
  return baseCards[0].username;
}

function gameStarted(socket, data) {
  const { username, gameCode } = data;
  const game = gameData[gameCode];
  if (Object.keys(game["players"]).length == 4) {
    if (game.status === "WAITING_TO_JOIN") {
      game.status = "CHOOSE_TEAM";
      game.message = { type: "CHOOSE_TEAM", message: game.playersOrder[0] };
    }
    io.to(gameCode).emit("update", game);
  }
}

function decideTrump(socket) {
  const gameCode = Object.keys(socket.rooms)[0];
  const game = gameData[gameCode];
  game.message = { type: "DECIDE_TRUMP", message: game.trumpTeller };
  io.to(gameCode).emit("update", game);
}

function getWinner(game) {
  const blueTeamPoints = game.teams.blue
    .map((user) => game.players[user].points.length)
    .reduce((a, b) => a + b, 0);
  const redTeamPoints = game.teams.red
    .map((user) => game.players[user].points.length)
    .reduce((a, b) => a + b, 0);

  const maxHandNumber = game.players[game.trumpTeller].handsCountTold;
  const maxHandTellerTeam = game.teams.blue.includes(game.trumpTeller)
    ? "blue"
    : "red";
  if (maxHandTellerTeam === "blue") {
    if (blueTeamPoints >= maxHandNumber) return "Blue";
    else return "Red";
  } else {
    if (redTeamPoints >= maxHandNumber) return "Red";
    else return "Blue";
  }
}

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("create", (data) => {
    const { username } = data;
    const gameCode = Math.random().toString(36).substring(7);
    gameData[gameCode] = {
      players: {},
      cards: [],
      gameCode: gameCode,
      status: "WAITING_TO_JOIN",
    };
    const game = gameData[gameCode];
    const cards = [];
    values.forEach((v) => {
      suits.forEach((s) => cards.push({ suit: s, value: v }));
    });
    shuffle(cards);

    game["cards"] = [...cards];
    game["players"][username] = {
      cards: gameData[gameCode].cards.splice(0, 13),
      points: [],
      iconNumber: getRandomInt(16),
    };
    console.log("connected game room ", gameCode, username);
    socket.leaveAll();
    socket.join(gameCode);
    game.message = { type: "CREATED", message: gameCode };
    socket.emit("created", game);
  });

  socket.on("my-hand-count", (data) => {
    const { username, hands } = data;
    const gameCode = Object.keys(socket.rooms)[0];
    const game = gameData[gameCode];
    game.players[username].handsCountTold = hands;
    game.status = "TELL_HANDS";
    if (hands > game.minHandsToTell) {
      game.minHandsToTell = hands;
      game.trumpTeller = username;
    }
    const idx = indexOf(game.playersOrder, username);
    if (idx != 3) {
      game.tellHandsUsername = game.playersOrder[idx + 1];
      game.message = { type: "TELL_HANDS", message: game.tellHandsUsername };
      io.to(gameCode).emit("update", game);
    } else {
      game.status = "TRUMP_DECIDE";
      decideTrump(socket);
    }
  });

  socket.on("trump-decide", (data) => {
    const { username, trump } = data;
    const gameCode = Object.keys(socket.rooms)[0];
    const game = gameData[gameCode];
    game.trump = trump;
    game.status = "GAME_STARTED";
    game.turnOf = game.trumpTeller;
    game.currentBoard = [];
    game.message = { type: "TRUMP_DECIDE", message: trump };
    io.to(gameCode).emit("update", game);
  });

  socket.on("dealt-card", (data) => {
    const { username, card } = data;
    const gameCode = Object.keys(socket.rooms)[0];
    const game = gameData[gameCode];

    game.players[username].cards = game.players[username].cards.filter(
      (c) => !isEqual(c, card)
    );
    game.currentBoard = game.currentBoard.filter(
      (card) => !isEqual(card, { card, username })
    );
    game.currentBoard.push({ card, username });
    if (game.currentBoard.length == 4) {
      const user = calculateWinner(game.currentBoard, game.trump);
      game.turnOf = "";
      game.players[user].points.push([...game.currentBoard]);
      game.lastRoundWinner = user;
      game.message = {
        type: "LAST_ROUND_WINNER",
        message: game.lastRoundWinner,
      };
      io.to(gameCode).emit("update", game);
      setTimeout(() => {
        game.turnOf = user;
        game.currentBoard = [];
        io.to(gameCode).emit("update", game);
        if (game.players[user].cards.length === 0) {
          game.status = "GAME_OVER"
          game.message = {
            type: "GAME_OVER",
            message: getWinner(game),
          };
          io.to(gameCode).emit("update", game);
        }
      }, 3000);
    } else {
      const idx = indexOf(game.playersOrder, username);
      game.turnOf = game.playersOrder[(idx + 1) % 4];
      game.message = { type: "TURN_OF", message: game.turnOf };
      io.to(gameCode).emit("update", game);
    }
  });

  socket.on("message", (data) => {
    const { username, message } = data;
    const gameCode = Object.keys(socket.rooms)[0];
    const game = gameData[gameCode];
    game.message = { username, message };
    io.to(gameCode).emit("update", game);
  });

  socket.on("join", (data) => {
    const { username, gameCode } = data;
    const game = gameData[gameCode];
    if (game === undefined || game.players.length == 4) return;
    gameStarted(socket, data);

    if (game["players"][username] == undefined) {
      let iconNumber = getRandomInt(16);
      while (
        Object.keys(game.players).filter(
          (key) => game.players[key].iconNumber == iconNumber
        ).length != 0
      )
        iconNumber = getRandomInt(16);
      game["players"][username] = {
        cards: gameData[gameCode].cards.splice(0, 13),
        points: [],
        iconNumber,
      };
      gameData[gameCode].playersOrder = Object.keys(game["players"]).sort();
    }

    console.log("joined game room ", gameCode, username);
    socket.leaveAll();
    socket.join(gameCode);
    game.message = { type: "JOINED", message: username };
    io.to(gameCode).emit("joined", game);
    gameStarted(socket, data);
  });

  socket.on("choose-team", (data) => {
    const { team } = data;
    const gameCode = Object.keys(socket.rooms)[0];
    const game = gameData[gameCode];
    game.teams = {
      blue: team,
      red: difference(Object.keys(game.players), team),
    };
    game.playersOrder = [
      game.teams.blue[0],
      game.teams.red[0],
      game.teams.blue[1],
      game.teams.red[1],
    ];

    game.status = "TELL_HANDS";
    game.tellHandsUsername = game.playersOrder[0];
    game.trumpTeller = game.playersOrder[0];
    game.minHandsToTell = 7;
    game.message = { type: "TELL_HANDS", message: game.tellHandsUsername };
    io.to(gameCode).emit("joined", game);
  });

  socket.emit(
    "rooms",
    Object.keys(gameData)
      .filter((key) => Object.keys(gameData[key].players).length < 4)
      .map((key) => ({
        key,
        players: [...Object.keys(gameData[key].players)],
      }))
  );
});

server.listen(port, () => console.log(`Listening on port ${port}`));
