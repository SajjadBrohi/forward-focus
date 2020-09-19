const puppeteer = require('puppeteer');

const PRIZE_CHECKER = 'https://www.nsandi.com/prize-checker';
const AREA_PATTERNS = process.argv
	.slice(2)
	.map((location) => new RegExp(location, 'i'));

(async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto(PRIZE_CHECKER);
	await page.click('#high-value-winners');

	let moreResults = true;

	const winners = [];

	while (moreResults) {
		const newWinners = await page.evaluate(() => {
			const rowNodeList = document.querySelectorAll('#table-prizewinner tr');
			const rowArray = Array.from(rowNodeList);

			return rowArray.slice(1).map((tr) => {
				const dataNodeList = tr.querySelectorAll('td');
				const dataArray = Array.from(dataNodeList);
				const [
					prizeValue,
					winningBond,
					holding,
					area,
					bondValue,
					purchased,
				] = dataArray.map((td) => td.textContent);

				return {
					prizeValue,
					winningBond,
					holding,
					area,
					bondValue,
					purchased,
				};
			});
		});

		winners.push(...newWinners);

		try {
			await page.click('#table-prizewinner_next:not(.disabled)');
		} catch (error) {
			moreResults = false;
		}
	}

	const areaWinners = filterWinners(winners);

	outputWinners(areaWinners);

	await browser.close();
})();

const filterWinners = (winners) => {
	return winners.filter((winner) => {
		return AREA_PATTERNS.some((pattern) => pattern.test(winner.area));
	});
};

const outputWinners = (winners) => {
	if (winners.length) {
		console.log(JSON.stringify(winners, null, 2));
	} else {
		console.log('No winners in specified locations');
	}
};
