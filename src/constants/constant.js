import { LANGUAGE } from "../config";
import EnConstants from "./en";
import HIConstants from "./hi";
import BaburawConstants from "./baburaw";

const Lang_toConstants = {
  en: EnConstants,
  hi: HIConstants,
  baburaw: BaburawConstants
};

let constants = Lang_toConstants[LANGUAGE];

export const setConstants = lang => {
  constants = Lang_toConstants[lang];
};

export default {
  waitingToJoin: gameCode =>
    constants.WAITING_TO_JOIN.replace(/\${gameCode}/g, gameCode),
  tellHands: tellHandsUsername =>
    constants.TELL_HANDS.replace(/\${tellHandsUsername}/g, tellHandsUsername),
  trumpDecide: (trumpTeller, minHandsToTell) =>
    constants.TRUMP_DECIDE.replace(/\${trumpTeller}/g, trumpTeller).replace(
      /\${minHandsToTell}/g,
      minHandsToTell
    ),
  gameStarted: {
    yourMove: () => constants.GAME_STARTED.YOUR_MOVE,
    waiting: turnOf =>
      constants.GAME_STARTED.WAITING.replace(/\${turnOf}/g, turnOf),
    lastRoundWinner: lastRoundWinner =>
      constants.GAME_STARTED.LAST_ROUND_WINNER.replace(
        /\${lastRoundWinner}/g,
        lastRoundWinner
      )
  },
  myHandSubtitle: (username, points, trump) =>
    constants.MY_HAND_SUBTITLE.replace(/\${username}/g, username)
      .replace(/\${points}/g, points)
      .replace(/\${trump}/g, trump),
  youTellHands: () => constants.YOU_TELL_HANDS
};
