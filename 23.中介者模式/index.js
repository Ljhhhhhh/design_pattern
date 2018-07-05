function Player(name, teamColor) {
  this.name = name;
  this.teamColor = teamColor;
  this.state = 'alive';
};

Player.prototype.win = function () {
  console.log(this.name + ' win');
};

Player.prototype.lose = function () {
  console.log(this.name + ' lose');
};

Player.prototype.die = function () {
  this.state = 'dead';
  playerDirector.ReceiveMessage('playerDead', this);
};

Player.prototype.remove = function () {
  playerDirector.ReceiveMessage('removePlayer', this);
};

Player.prototype.changeTeam = function (color) {
  playerDirector.ReceiveMessage('changeTeam', this, color);
};

var playerFactory = function (name, teamColor) {
  var newPlayer = new Player(name, teamColor);
  playerDirector.ReceiveMessage('addPlayer', newPlayer);

  return newPlayer;
};


// 中介者模式
var playerDirector = (function () {
  var players = {},
      operations = {};
  
  operations.addPlayer = function (player) {
    var teamColor = player.teamColor;
    players[teamColor] = players[teamColor] || [];
    players[teamColor].push(player);
  };

  operations.removePlayer = function (player) {
    var teamColor = player.teamColor,
        teamPlays = players[teamColor] || [];
    for (var i = teamPlays.length - 1; i >= 0; i--) {
      if (teamPlays[i] === player) {
        teamPlays.splice(i, 1);
      }
    }
  };

  operations.changeTeam = function (player, newTeamColor) {
    operations.removePlayer(player);
    player.teamColor = newTeamColor;
    operations.addPlayer(player);
  };

  operations.playerDead = function (player) {
    var teamColor = player.teamColor,
        teamPlays = players[teamColor];
    var all_dead = true;

    for (var i = 0, player; player = teamPlays[i++];) {
      if (player.state !== 'dead') {
        all_dead = false;
        break;
      }
    }

    if (all_dead === true) {
      for (var i = 0, player; player = teamPlays[i++];) {
        player.lose();
      }

      for (var color in players) {
        if (color !== teamColor) {
          var teamPlays = players[color];
          for (var i = 0, player; player = teamPlays[i++];) {
            player.win();
          }
        }
      }
    }
  };

  var ReceiveMessage = function () {
    var message = Array.prototype.shift.call(arguments);
    operations[message].apply(this, arguments);
  };

  return {
    ReceiveMessage: ReceiveMessage
  }
})();

// 红队

var player1 = playerFactory('1', 'red'),
    player2 = playerFactory('2', 'red'),
    player3 = playerFactory('3', 'red'),
    player4 = playerFactory('4', 'red');

// 蓝队

var player5 = playerFactory('5', 'blue'),
    player6 = playerFactory('6', 'blue'),
    player7 = playerFactory('7', 'blue'),
    player8 = playerFactory('8', 'blue');

player1.changeTeam('blue');
player2.die();
player3.die();
player5.die();
player4.die();