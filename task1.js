//
// 実行方法：　コマンドプロンプトに以下のコマンドを入力
//
//                               node task1.js
//
///////////////////////////////////////////////////////////////

class QueenPos {
	constructor(iRow, iCol) {
		this.iRow = iRow;
		this.iCol = iCol;
	}
	get leftDiagonal() {
		return this.iRow - this.iCol;
	}
	get rightDiagonal() {
		return this.iRow + this.iCol;
	}
}

function check(queensPos, iRow, iCol) {
	const newQueenPos = new QueenPos(iRow, iCol);
	for (let iQueen = 0; iQueen < queensPos.length;  iQueen++) {
	const currentQueenPos = queensPos[iQueen];
		if (currentQueenPos &&
			(newQueenPos.iCol == currentQueenPos.iCol
			|| newQueenPos.iRow == currentQueenPos.iRow
			|| newQueenPos.leftDiagonal == currentQueenPos.leftDiagonal
			|| newQueenPos.rightDiagonal == currentQueenPos.rightDiagonal)) {
			return false;
		}
	}
	return true;
}

function nQueensRecursive(solutions, previousQueensPos, queensCount, iRow) {
	const queensPos = [...previousQueensPos].map((queenPos) => {
		return !queenPos ? queenPos : new QueenPos(queenPos.iRow,queenPos.iCol,);});
	if (iRow == queensCount) {
		solutions.push(queensPos);
		return;
	}
	for (let iCol = 0; iCol < queensCount; iCol++) {
		if (check(queensPos, iRow, iCol)) {
			queensPos[iRow] = new QueenPos(iRow, iCol);
			nQueensRecursive(solutions, queensPos, queensCount, iRow + 1);
			queensPos[iRow] = null;
		}
	}
	return;
}

let queensPos = [];
let solutions = [];
let sol = [];
let colPosition = [];
let out = "";
let queensCount = 8;
let iCol, iRow;

nQueensRecursive(solutions, queensPos, queensCount, 0);
sol = solutions[0];
for (iRow=0; iRow < queensCount; iRow++) {
	out = "";
	colPosition = sol[iRow];
	for (iCol=0; iCol < queensCount; iCol++) {
		if (iCol == colPosition.iCol) {
			out += "Q";
		} else {
			out += ".";
		}
	}
	console.log(out);
}
