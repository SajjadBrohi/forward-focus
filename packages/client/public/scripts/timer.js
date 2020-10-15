const timerButtons = document.querySelectorAll('.timer__button');
const timeLeftDisplay = document.querySelector('.display__time-left');
const endTimeDisplay = document.querySelector('.display__end-time');
const minutesForm = document.customForm;

let timerTime;
let interval;

function addZeroToTime(time) {
	if (time <= 9) {
		return `0${time}`;
	} else {
		return time;
	}
}

function getTime(timeInSeconds) {
	let seconds = timeInSeconds % 60;
	let minutes = ((timeInSeconds - seconds) / 60) % 60;
	let hours = (timeInSeconds - seconds - minutes * 60) / 3600;

	return `${addZeroToTime(hours)}:${addZeroToTime(minutes)}:${addZeroToTime(
		seconds,
	)}`;
}

function changeTimerDisplay() {
	if (timerTime == 0) {
		clearInterval(interval);
		return;
	}
	timerTime--;
	let displayTimerTime = getTime(timerTime);

	timeLeftDisplay.innerText = displayTimerTime;
	document.title = displayTimerTime;
}

function changeReturnTimeDisplay(timeOfTimer) {
	let currentTime = new Date();
	currentTime =
		currentTime.getHours() * 3600 +
		currentTime.getMinutes() * 60 +
		currentTime.getSeconds() +
		parseFloat(timeOfTimer);

	currentTime = getTime(currentTime);
	endTimeDisplay.innerText = `Be back at ${currentTime.slice(0, 5)}`;
}

function startTimer(timerTimeInSeconds) {
	timerTime = timerTimeInSeconds;
	timeLeftDisplay.innerText = getTime(timerTime);
	changeReturnTimeDisplay(timerTime);

	clearInterval(interval);
	interval = setInterval(() => {
		changeTimerDisplay();
	}, 1000);
}

function formMinutesFormatting(e) {
	e.preventDefault();
	startTimer(this.minutes.value * 60);
	this.reset();
}

timerButtons.forEach((button) =>
	button.addEventListener('click', (e) => startTimer(e.target.dataset.time)),
);

minutesForm.addEventListener('submit', formMinutesFormatting);
