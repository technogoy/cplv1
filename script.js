document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const scoreInputSection = document.getElementById('scoreInput');
    const scoreForm = document.getElementById('scoreForm');
    const showScoresButton = document.getElementById('showScoresButton');
    const scoresDisplay = document.getElementById('scoresDisplay');
    const scoresList = document.getElementById('scoresList');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple validation (you can add more complex validation here)
        if (username === '' || password === '') {
            alert('Please fill in both fields.');
            return;
        }

        // Simulate login process (replace with actual login logic)
        if (username === 'admin' && password === 'password') {
            alert('Login successful!');
            // Hide login form and show score input form
            loginForm.style.display = 'none';
            scoreInputSection.style.display = 'block';
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
        const score1 = document.getElementById('score1').value;
        const score2 = document.getElementById('score2').value;

        // Simple validation
        if (team1 === '' || team1Player1 === '' || team1Player2 === '' || team2 === '' || team2Player1 === '' || team2Player2 === '' || score1 === '' || score2 === '') {
            alert('Please fill in all fields.');
            return;
        }

        // Store the scores in local storage
        const scores = JSON.parse(localStorage.getItem('scores')) || [];
        scores.push({ team1, team1Player1, team1Player2, team2, team2Player1, team2Player2, score1, score2 });
        localStorage.setItem('scores', JSON.stringify(scores));

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
});