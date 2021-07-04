const Command = require('./Command');
const Player = require('./Player');
const { shuffle, hasGameEnded, showRanks, createPlayers, getNextPlayer } = require('./utils');


const Game = (() => {

  const command = new Command();

  async function askForInput() {
    console.log('Welcome to roll Dice'.toUpperCase());
    const numberOfPlayers = await command.askUser('How many players you want to add ?', data => !isNaN(data));
    const totalPoints = await command.askUser(`Enter total Points required to win ?`, data => !isNaN(data));
    return { numberOfPlayers, totalPoints };
  }



  function compose(numberOfPlayers, totalPoints) {
    let players = createPlayers(numberOfPlayers), roundCount = 1, playerRemaining = players.length;

    Player.prototype.total_points = totalPoints;

    let i = 0;
    players = shuffle(players);

    command.initKeyPressEvent(() => {


      let obj = players[i];
      const currentValue = obj.roll();
      playerRemaining = obj.updateRank(playerRemaining);


      const GAME_ENDED = hasGameEnded(players, playerRemaining);
      showRanks(players);
      
      if (GAME_ENDED) {
        command.dispose();
        console.log('GAME END !!! ABOVE IS THE FINAL GAME RANK.')
        process.exit();
      }

      if (obj.lastTwoValues.length > 1 && obj.lastTwoValues.every(val => val === 1)) {
        console.warn(`WARNING: You got consective 1's, So as penalty Next time your turn will be skipped`);
        obj.skipInRound = roundCount + 1;
        obj.lastTwoValues = [];
      }

      if (currentValue === 6) {
        if (obj.getRank()) {
          const data = getNextPlayer(players, i, roundCount);
          i = data.i;
          roundCount = data.roundCount;
        }
        console.log(`YAYY !!! ${players[i].name} you got 6`);
      } else {
        const data = getNextPlayer(players, i, roundCount);
        i = data.i;
        roundCount = data.roundCount;
      }

      console.log("============================================");
      console.log("============================================");

      console.log(`${players[i].name} its your turn (press ‘r’ to roll the dice)`);
    });
    console.log(`${players[i].name} its your turn (press ‘r’ to roll the dice)`);

  }

  return {
    askForInput,
    compose
  }

})();



Game.askForInput().then(({ numberOfPlayers, totalPoints }) => {
  Game.compose(numberOfPlayers, totalPoints);
}).catch(err => {
  console.log(`TERMINATE PROCESS WITH ERROR: `, err);
  process.exit();
});

