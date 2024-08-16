let commonAmount = 0;
let players = [];
let currentPlayerIndex = 0;

function startGame() {
    commonAmount = parseInt(document.getElementById('common-amount').value);
    if (isNaN(commonAmount) || commonAmount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    document.getElementById('host-setup').style.display = 'none';
    document.getElementById('player-setup').style.display = 'block';
}

function addPlayer() {
    const playerName = prompt('Enter Player Name:');
    if (playerName) {
        players.push({ name: playerName, points: commonAmount, action: '' });
        updatePlayersList();
    }
}

function updatePlayersList() {
    const playersDiv = document.getElementById('players');
    playersDiv.innerHTML = '';
    players.forEach((player, index) => {
        playersDiv.innerHTML += `<p>Player ${index + 1}: ${player.name} - Points: ${player.points}</p>`;
    });
}

function finishSetup() {
    if (players.length < 2) {
        alert('At least 2 players are required to start the game');
        return;
    }

    document.getElementById('player-setup').style.display = 'none';
    document.getElementById('game-actions').style.display = 'block';
    updateGameOptions();
}

function updateGameOptions() {
    const playerOptionsDiv = document.getElementById('player-options');
    playerOptionsDiv.innerHTML = '';

    players.forEach((player, index) => {
        playerOptionsDiv.innerHTML += `
            <div>
                <h4>${player.name}</h4>
                <label>
                    <input type="radio" name="action${index}" value="Pack"> Pack
                </label>
                <label>
                    <input type="radio" name="action${index}" value="Blind"> Blind
                </label>
                <label>
                    <input type="radio" name="action${index}" value="Chall"> Chall
                </label>
            </div>
        `;
    });
}

function endRound() {
    players.forEach((player, index) => {
        const selectedAction = document.querySelector(`input[name="action${index}"]:checked`);
        if (selectedAction) {
            player.action = selectedAction.value;
        }
    });

    const winnerIndex = parseInt(prompt('Host: Enter the number of the winning player:')) - 1;
    if (isNaN(winnerIndex) || winnerIndex < 0 || winnerIndex >= players.length) {
        alert('Invalid player number');
        return;
    }

    const pot = players.reduce((total, player) => {
        if (player.action === 'Pack') return total;
        return total + commonAmount;
    }, 0);

    players[winnerIndex].points += pot;
    updatePointsDisplay();
}

function updatePointsDisplay() {
    document.getElementById('game-actions').style.display = 'none';
    document.getElementById('points-display').style.display = 'block';

    const pointsTableDiv = document.getElementById('points-table');
    pointsTableDiv.innerHTML = '<h3>Current Points:</h3>';
    players.forEach((player, index) => {
        pointsTableDiv.innerHTML += `<p>${player.name}: ${player.points} points</p>`;
    });
}

function nextRound() {
    players.forEach(player => player.action = '');
    document.getElementById('points-display').style.display = 'none';
    document.getElementById('game-actions').style.display = 'block';
    updateGameOptions();
      }
