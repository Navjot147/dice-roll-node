
const readline = require('readline');

function Command() {
  const Ireadline = readline.createInterface(process.stdin, process.stdout, null);

  this.askUser = async function (query, validationCb) {
    return new Promise((res, rej) => {
      Ireadline.question(`${query}`, data => {
        if (validationCb) {
          if (validationCb(data)) {
            res(data);
          } else {
            console.log("Invalid entry, please try again!!");
            askUser(query, validationCb);
          }
        } else {
          res(data);
        }
      });
    })
  }

  this.initKeyPressEvent = function (cb) {
    process.stdin.on('keypress', (str, key) => {
      if (key.ctrl && key.name === 'c') {
        process.exit();
      } else if (key.name === 'r') {
        cb();
      } else {
        console.log('Invalid Entry !! (press ‘r’ to roll the dice)');
      }
    });
  }

  this.dispose = function () {
    Ireadline.close();
  };

}

module.exports = Command;