class BoggleGame {
	constructor(time = 60) {
		// Initialize game properties
		this.score = 0;
		this.words = new Set();

		// Get references to DOM elements
		this.board = document.querySelector("#board");
		this.bank = document.querySelector("#guesses");
		this.form = document.querySelector("#guess-form");
		this.message = document.querySelector("#messages");

		// Add a form submit event listener
		this.form.addEventListener("submit", this.handler.bind(this));

		// Set the initial countdown time and start the timer
		this.countdown = time;
		this.timer = setInterval(this.tick.bind(this), 1000);
		this.showClock();
	}

	// Display the remaining time
	showClock() {
		document.querySelector("#clock").innerText = `${this.countdown}`;
	}

	// Update the countdown and end the game if time has hit 0
	tick() {
		this.countdown--;
		if (this.countdown === 0) {
			clearInterval(this.timer);
			this.endGame();
		}
		this.showClock();
	}

	// Add a capitalized guessed word to the set of words
	addWord(word) {
		this.words.add(word);
		let li = document.createElement("li");
		li.innerText = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
		this.bank.appendChild(li);
	}

	// Handle form submissions
	async handler(evt) {
        evt.preventDefault();
        let guess = this.form[0].value;
        this.form[0].value = '';
		let response = await axios.get("/board-guess", {
			params: { 'guess': guess },
        });
		let validity = response.data.result;
		// Clear any existing message classes
		this.message.classList.remove("valid", "invalid", "dupe");

		if (validity === "not-word") {
			this.message.innerText = "INVALID WORD";
			this.message.classList.add("invalid");
		} else if (validity === "not-on-board") {
			this.message.innerText = "WORD NOT PRESENT";
			this.message.classList.add("invalid");
		} else if (validity === "ok") {
			if (!this.words.has(guess)) {
				this.addWord(guess);
				this.message.innerText = "WORD ADDED";
				this.message.classList.add("valid");
			} else {
				this.message.innerText = "DUPLICATE WORD";
				this.message.classList.add("dupe");
			}
			this.score += guess.length;
			document.querySelector("#score").innerText = `${this.score}`;
		}
	}

	// End the game
	async endGame() {
		// Hide the form
        this.form.style.visibility = "hidden";
		let response = await axios.post("/post-score", { 'score': this.score });
		if (response.data.new_record === true) {
			document.querySelector("#high_score").innerText = `${this.score}`;
		}
	}
}
