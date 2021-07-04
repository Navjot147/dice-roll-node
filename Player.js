const { getRandNum } = require('./utils');

const dice = (function () {
  const min = 1, max = 7
  return {
    roll: function () {
      return getRandNum(min, max);
    },
    currentRank: 1
  }
})();

function Player(name) {
  let score = 0;
  let rank = null;
  this.name = name;
  this.lastTwoValues = []

  const addLatestTwoValues = val => {
    if (this.lastTwoValues.length > 1) {
      this.lastTwoValues[0] = this.lastTwoValues[1];
      this.lastTwoValues[1] = val;
    } else {
      this.lastTwoValues.push(val);
    }
  }

  this.getScore = function () {
    return score;
  };

  this.getRank = function () {
    return rank;
  };

  this.updateRank = function (playerRemaining) {
    if (score >= this.__proto__.total_points || playerRemaining === 1) {
      rank = dice.currentRank;
      dice.currentRank++;
      playerRemaining--;
    }
    return playerRemaining;
  }

  this.roll = function () {
    const val = dice.roll();
    console.log(`You got Dice value: ${val}`);
    addLatestTwoValues(val);
    score = score + val;
    return val;
  }
}

module.exports = Player;