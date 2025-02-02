document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const scoreInputSection = document.getElementById('scoreInput');
    const scoreForm = document.getElementById('scoreForm');
    const showScoresButton = document.getElementById('showScoresButton');
    const showStandingsButton = document.getElementById('showStandingsButton');
    const clearScoresButton = document.getElementById('clearScoresButton');
    const scoresDisplay = document.getElementById('scoresDisplay');
    const scoresList = document.getElementById('scoresList');
    const standingsDisplay = document.getElementById('standingsDisplay');
    const standingsList = document.getElementById('standingsList');

    const teams = {
        "Team A": ["Player A1", "Player A2", "Player A3", "Player A4"],
        "Team B": ["Player B1", "Player B2", "Player B3", "Player B4"],
        "Team C": ["Player C1", "Player C2", "Player C3", "Player C4"],
        "Team D": ["Player D1", "Player D2", "Player D3", "Player D4"]
    };

    const users = {
        "admin": { password: "adminpassword", role: "admin" },
        "user": { password: "userpassword", role: "user" }
    };

    let currentUserRole = null;

    const team1Select = document.getElementById('team1');
    const team1Player1Select = document.getElementById('team1Player1');
    const team1Player2Select = document.getElementById('team1Player2');
    const team2Select = document.getElementById('team2');
    const team2Player1Select = document.getElementById('team2Player1');
    const team2Player2Select = document.getElementById('team2Player2');

    function populatePlayers(teamSelect, player1Select, player2Select) {
        const team = teamSelect.value;
        const players = teams[team] || [];
        player1Select.innerHTML = '';
        player2Select.innerHTML = '';
        players.forEach(player => {
            const option1 = document.createElement('option');
            option1.value = player;
            option1.textContent = player;
            player1Select.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = player;
            option2.textContent = player;
            player2Select.appendChild(option2);
        });
    }

    team1Select.addEventListener('change', () => {
        console.log('Team 1 changed:', team1Select.value);
        populatePlayers(team1Select, team1Player1Select, team1Player2Select);
    });

    team2Select.addEventListener('change', () => {
        console.log('Team 2 changed:', team2Select.value);
        populatePlayers(team2Select, team2Player1Select, team2Player2Select);
    });

    // Populate players for the initial team selections
    populatePlayers(team1Select, team1Player1Select, team1Player2Select);
    populatePlayers(team2Select, team2Player1Select, team2Player2Select);

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple validation (you can add more complex validation here)
        if (username === '' || password === '') {
            alert('Please fill in both fields.');
            return;
        }

        // Authenticate user
        if (users[username] && users[username].password === password) {
            currentUserRole = users[username].role;
            alert('Login successful!');
            // Hide login form and show score input form
            loginForm.style.display = 'none';
            scoreInputSection.style.display = 'block';

            // Show clear scores button only for admin
            if (currentUserRole === 'admin') {
                clearScoresButton.style.display = 'block';
            }
        } else {
            alert('Invalid username or password.');
        }
    });

    scoreForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const team1 = document.getElementById('team1').value;
        const team1Player1 = document.getElementById('team1Player1').value;
        const team1Player2 = document.getElementById('team1Player2').value;
        const team2 = document.getElementById('team2').value;
        const team2Player1 = document.getElementById('team2Player1').value;
        const team2Player2 = document.getElementById('team2Player2').value;
        const score1 = parseInt(document.getElementById('score1').value, 10);
        const score2 = parseInt(document.getElementById('score2').value, 10);

        // Simple validation
        if (team1 === '' || team1Player1 === '' || team1Player2 === '' || team2 === '' || team2Player1 === '' || team2Player2 === '' || isNaN(score1) || isNaN(score2)) {
            alert('Please fill in all fields.');
            return;
        }

        // Ensure the same team is not playing against itself
        if (team1 === team2) {
            alert('A team cannot play against itself. Please select different teams.');
            return;
        }

        // Ensure different players for each team
        if (team1Player1 === team1Player2) {
            alert('Team 1 cannot have the same player for both positions. Please select different players.');
            return;
        }

        if (team2Player1 === team2Player2) {
            alert('Team 2 cannot have the same player for both positions. Please select different players.');
            return;
        }

        // Score validation
        if (score1 > 23 || score2 > 23) {
            alert('The maximum score a team can have is 23 points.');
            return;
        }

        if (Math.abs(score1 - score2) < 2) {
            alert('The difference between the winning team and losing team must be at least 2 points.');
            return;
        }

        // Store the scores in local storage
        const scores = JSON.parse(localStorage.getItem('scores')) || [];
        scores.push({ team1, team1Player1, team1Player2, team2, team2Player1, team2Player2, score1, score2 });
        localStorage.setItem('scores', JSON.stringify(scores));

        // Update standings
        const standings = JSON.parse(localStorage.getItem('standings')) || {};
        standings[team1] = standings[team1] || { wins: 0, losses: 0, points: 0 };
        standings[team2] = standings[team2] || { wins: 0, losses: 0, points: 0 };

        if (score1 > score2) {
            standings[team1].wins += 1;
            standings[team1].points += 2;
            standings[team2].losses += 1;
        } else {
            standings[team2].wins += 1;
            standings[team2].points += 2;
            standings[team1].losses += 1;
        }

        localStorage.setItem('standings', JSON.stringify(standings));

        alert(`Scores submitted:\n${team1} (${team1Player1} & ${team1Player2}): ${score1}\n${team2} (${team2Player1} & ${team2Player2}): ${score2}`);
    });

    showScoresButton.addEventListener('click', () => {
        const scores = JSON.parse(localStorage.getItem('scores')) || [];
        scoresList.innerHTML = '';

        if (scores.length === 0) {
            scoresList.innerHTML = '<li>No scores available.</li>';
        } else {
            scores.forEach(score => {
                const listItem = document.createElement('li');
                listItem.textContent = `${score.team1} (${score.team1Player1} & ${score.team1Player2}) vs ${score.team2} (${score.team2Player1} & ${score.team2Player2}): ${score.score1} - ${score.score2}`;
                scoresList.appendChild(listItem);
            });
        }

        scoresDisplay.style.display = 'block';
    });

    showStandingsButton.addEventListener('click', () => {
        const standings = JSON.parse(localStorage.getItem('standings')) || {};
        standingsList.innerHTML = '';

        const sortedTeams = Object.keys(standings).sort((a, b) => standings[b].points - standings[a].points);

        if (sortedTeams.length === 0) {
            standingsList.innerHTML = '<li>No standings available.</li>';
        } else {
            sortedTeams.forEach(team => {
                const listItem = document.createElement('li');
                listItem.textContent = `${team}: ${standings[team].points} points (Wins: ${standings[team].wins}, Losses: ${standings[team].losses})`;
                standingsList.appendChild(listItem);
            });
        }

        standingsDisplay.style.display = 'block';
    });

    clearScoresButton.addEventListener('click', () => {
        if (currentUserRole === 'admin') {
            localStorage.removeItem('scores');
            alert('All scores have been cleared.');
            scoresList.innerHTML = '';
            scoresDisplay.style.display = 'none';
        } else {
            alert('You do not have permission to clear scores.');
        }
    });
});