import Chessground from "https://dev.jspm.io/chessground";
const { Chess } = (await import("https://dev.jspm.io/chess.js")).default;
import { toDests, toColor } from "./util.js";

const el = document.querySelector("#board-container");

const chess = Chess();
const cg = Chessground(el, {
    movable: {
        color: "white",
        free: false,
        dests: toDests(chess),
        showDests: false,
    },
});
cg.set({
    movable: {
        events: {
            after: function playOtherSide(orig, dest) {
                chess.move({from: orig, to: dest});
                postMessage({
                    chess
                }, "*");
                // cg.set({
                //     // turnColor: toColor(chess),
                //     movable: {
                //         // color: toColor(chess),
                //         // dests: toDests(chess)
                //     }
                // });
            }
        }
    }
});
 