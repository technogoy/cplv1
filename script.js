function changeGreeting() {
    const greetings = ["Hello, World!", "Hi there!", "Greetings!", "Salutations!", "Howdy!"];
    const greetingElement = document.getElementById("greeting");
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    greetingElement.textContent = randomGreeting;
}
