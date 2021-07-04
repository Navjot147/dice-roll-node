
const getRandNum = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const shuffle = array => {
  var currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};

const hasGameEnded = (players = [], playerRemaining) => {
  if (playerRemaining === 1) {
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (!player.getRank()) {
        player.updateRank(1);
        break;
      }
    }
    return true;
  }
  return false;
}

const showRanks = (players = []) => {
  const rankedPlayers = players.filter(player => Boolean(player.getRank()));
  const nonRankedPlayers = players.filter(player => !Boolean(player.getRank()));
  rankedPlayers.sort(function (a, b) {
    return a.getRank() - b.getRank();
  });
  console.table(rankedPlayers.concat(nonRankedPlayers).map(player => { return { Name: player.name, Rank: player.getRank(), Score: player.getScore() } }));
}


function createPlayers(total) {
  const arr = [];
  const Player = require('./Player');
  for (let i = 0; i < total; i++) {
    const obj = new Player(`Player-${i + 1}`);
    arr.push(obj);
  }
  return arr;
}


function updateIndex(length, i, roundCount) {
  if (i === length - 1) {
    i = 0;
    roundCount++;
  } else {
    i++;
  }
  return { i, roundCount };
}

function getNextPlayer(players = [], i, roundCount) {
  const data = updateIndex(players.length, i, roundCount);
  i = data.i;
  roundCount = data.roundCount;

  let obj = players[i];
  while (i <= players.length - 1 && (Boolean(obj.getRank()) || obj.skipInRound === roundCount)) {
    const data = updateIndex(players.length, i, roundCount);
    i = data.i;
    roundCount = data.roundCount;
    obj = players[i];
  }
  return { i, roundCount };
}


module.exports = {
  getRandNum,
  shuffle,
  hasGameEnded,
  showRanks,
  createPlayers,
  getNextPlayer
}