import { useState } from "react";

type Player = "X" | "O" | null;

export function XOGame() {
    const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
    const [winner, setWinner] = useState<Player>(null);

    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const checkWinner = (brd: Player[]) => {
        for (const [a, b, c] of winPatterns) {
            if (brd[a] && brd[a] === brd[b] && brd[a] === brd[c]) {
                return brd[a];
            }
        }
        return null;
    };

    const aiMove = (brd: Player[]) => {
        // Try to win
        for (const [a, b, c] of winPatterns) {
            const line = [brd[a], brd[b], brd[c]];
            if (line.filter((x) => x === "O").length === 2 && line.includes(null)) {
                return [a, b, c][line.indexOf(null)];
            }
        }

        // Block X
        for (const [a, b, c] of winPatterns) {
            const line = [brd[a], brd[b], brd[c]];
            if (line.filter((x) => x === "X").length === 2 && line.includes(null)) {
                return [a, b, c][line.indexOf(null)];
            }
        }

        // Random move
        const empty = brd.map((v, i) => (v === null ? i : null)).filter((x) => x !== null) as number[];
        return empty[Math.floor(Math.random() * empty.length)];
    };

    const handleClick = (i: number) => {
        if (board[i] || winner) return;

        const newBoard = [...board];
        newBoard[i] = "X";
        setBoard(newBoard);

        const win = checkWinner(newBoard);
        if (win) return setWinner(win);

        const aiIndex = aiMove(newBoard);
        newBoard[aiIndex] = "O";
        setBoard([...newBoard]);

        const aiWin = checkWinner(newBoard);
        if (aiWin) setWinner(aiWin);
    };

    const reset = () => {
        setBoard(Array(9).fill(null));
        setWinner(null);
    };

    const colorfulXO = (p: Player) => {
        if (p === "X")
            return <span className="text-red-500 drop-shadow-[0_0_6px_#ff6b6b]">X</span>;
        if (p === "O")
            return <span className="text-blue-500 drop-shadow-[0_0_6px_#5bc0ff]">O</span>;
        return "";
    };

    return (
        <div className="p-6 max-w-sm mx-auto bg-gradient-to-br from-green-200 to-blue-200 rounded-2xl shadow-xl">
            <h1 className="text-3xl font-extrabold text-center mb-4 text-purple-700 drop-shadow">
                Tic Tac Toe
            </h1>

            {winner && (
                <div className="text-center text-2xl mb-3 font-bold text-green-600 drop-shadow">
                    Winner: {colorfulXO(winner)}
                </div>
            )}

            <div className="grid grid-cols-3 gap-3">
                {board.map((cell, i) => (
                    <button
                        key={i}
                        onClick={() => handleClick(i)}
                        className="w-24 h-24 bg-white rounded-xl flex items-center justify-center 
                        text-5xl font-extrabold shadow-md hover:shadow-xl transition-all duration-200 
                        hover:scale-105"
                    >
                        {colorfulXO(cell)}
                    </button>
                ))}
            </div>

            <button
                onClick={reset}
                className="mt-5 w-full bg-gradient-to-r from-blue-500 to-green-500 
                text-white p-3 rounded-xl font-bold hover:opacity-90 shadow-lg"
            >
                Restart Game
            </button>
        </div>
    );
}
