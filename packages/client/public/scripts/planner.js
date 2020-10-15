const CELLS = document.querySelectorAll('td');
const PLANS = document.querySelectorAll('.plans');
const DAYS = document.querySelector('.days');
const ACTIVITY_FORM = document.querySelector('#activity-details');
const CLOSE_BOTTON = document.querySelectorAll('.close-button');
const STATISTICS = document.querySelector('.statistics');
const STATISTICS_DIVS = document.querySelectorAll('.statistics div');
const STATS_BUTTON = document.querySelector('.stats-button');

let currentCell;

let filledCellClicked = false;
const activityTypeHours = {
	study: 0,
	coding: 0,
	job: 0,
	volunteer: 0,
	relax: 0,
	totalHours: 0,
	addHours(activity) {
		this[activity] += 4;
		this.totalHours += 4;
	},
	removeHours(activity) {
		this[activity] -= 4;
		this.totalHours -= 4;
	},
};

(function formatFormDays() {
	const currentDay = new Date().getDay();
	const currentDate = new Date();
	currentDate.setDate(currentDate.getDate() + (1 - currentDay));

	// Formatting the headings of the current and passed days
	for (let i = 1; i < DAYS.children.length; i++) {
		if (i < currentDay) {
			DAYS.children[i].classList.add('passed-day');
		} else if (i === currentDay) {
			DAYS.children[i].style.color = 'black';
			DAYS.children[i].children[0].classList.add('current-day');
		}

		DAYS.children[i].children[0].innerText = `${currentDate.getDate()}`;
		currentDate.setDate(currentDate.getDate() + 1);
	}

	// Formatting the 'activity' cells of the passed days
	for (let i = 1; i < currentDay; i++) {
		PLANS.forEach((plan) => {
			plan.children[i].classList.add('passed-day');
			plan.children[i].innerText = '';
		});
	}
})();

function changeActivityTypeBackground(activity, element) {
	switch (activity) {
		case 'study':
			element.style.backgroundColor = '#fc8eac'; //Flamingo
			break;
		case 'coding':
			element.style.backgroundColor = '#ffe135'; //Banana
			break;
		case 'job':
			element.style.backgroundColor = '#BCB88A'; //Sage
			break;
		case 'volunteer':
			element.style.backgroundColor = '#33A1C9'; //Peacock
			break;
		case 'relax':
			element.style.backgroundColor = '#967BB6'; //Lavender
			break;
	}
}

function updateStatistics() {
	let i = 0;
	for (let activity in activityTypeHours) {
		if (i < 5) {
			const statHeight =
				(activityTypeHours[activity] / activityTypeHours['totalHours']) *
					(55 - 0) +
				0;

			STATISTICS_DIVS[i].style.height = `${statHeight}vh`;
			changeActivityTypeBackground(activity, STATISTICS_DIVS[i]);
			i++;
		}
	}
}

function adjustCellFontSize(text) {
	let sizeOfFont = 1.4;
	if (text.length > 10) {
		//Appropriate text size determined by experimentation
		const textSize = text.length / 10;
		sizeOfFont = sizeOfFont / textSize;
	}
	currentCell.style.fontSize = `${sizeOfFont}em`;
}

function submitActivityDetails(e) {
	e.preventDefault();
	const activityDetails = this.activity.value;
	const activityType = this.activityType.value;

	if (activityDetails === '') {
		alert('Please enter activity details!');
		return;
	}

	// Adding activity details to the selected cell
	this.classList.add('hide');
	adjustCellFontSize(activityDetails);
	currentCell.innerText = activityDetails;
	currentCell.classList.add('filled');

	// If the cell was already filled, we remove the hours allocated to the previous activity type
	if (filledCellClicked) {
		activityTypeHours.removeHours(currentCell.dataset.activity);
		filledCellClicked = false;
	}

	currentCell.setAttribute('data-activity', `${activityType}`);
	activityTypeHours.addHours(activityType);

	//To format cell background based on the activity type selected
	changeActivityTypeBackground(activityType, currentCell);
	updateStatistics();
	this.reset();
}

function addActivity() {
	ACTIVITY_FORM.classList.remove('hide');
	typeof this.dataset.activity != 'undefined' ? (filledCellClicked = true) : '';
	currentCell = this;
}

CELLS.forEach((cell) => cell.addEventListener('click', addActivity));
ACTIVITY_FORM.addEventListener('submit', submitActivityDetails);

CLOSE_BOTTON.forEach((button) =>
	button.addEventListener('click', () =>
		button.parentElement.classList.add('hide'),
	),
);

STATS_BUTTON.addEventListener('click', () =>
	STATISTICS.classList.remove('hide'),
);
