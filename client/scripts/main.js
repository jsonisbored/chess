import Chessground from "https://dev.jspm.io/chessground";
const { Chess } = (await import("https://dev.jspm.io/chess.js")).default;
import { toDests, playOtherSide } from "./util.js";

const el = document.querySelector("#board-container");

const chess = Chess();
const cg = Chessground(el, {
    movable: {
        color: "white",
        free: false,
        dests: toDests(chess),
    },
    draggable: {
        showGhost: true
    }
});
cg.set({
    movable: { events: { after: playOtherSide(cg, chess) } }
});
