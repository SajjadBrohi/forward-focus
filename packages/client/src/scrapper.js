const puppeteer = require('puppeteer');

async function libraryScrapper() {
	const link = 'https://www.library.uq.edu.au/';

	const browser = await puppeteer.launch({
		headless: true,
		slowMo: 100,
		devtools: true,
	});

	try {
		const page = await browser.newPage();
		const librarySpaceAvailability = {};

		await page.setViewport({ width: 1199, height: 900 });

		await page.goto(link);

		await page.waitForSelector('#computersList .paper-item-0');

		// Extract the space availability information from the site
		const librarySpace = await page.evaluate(() => {
			const rowNodeList = document.querySelectorAll(
				'#computersList .paper-item-0 .computers-available',
			);
			const rowArray = Array.from(rowNodeList);
			let links = rowArray.map((element) => {
				const librarySpaceText = element.innerText.split(' free of ');
				return Math.floor((librarySpaceText[0] / librarySpaceText[1]) * 100);
			});
			return links;
		});

		// Extract the library name information from the site
		const libraryName = await page.evaluate(() => {
			const rowNodeList = document.querySelectorAll(
				'#computersList .paper-item-0 .linked-item',
			);
			const rowArray = Array.from(rowNodeList);
			let links = rowArray.map((element) => {
				return element.innerText;
			});
			return links;
		});

		libraryName.forEach((library, index) => {
			librarySpaceAvailability[library] = librarySpace[index];
		});

		await page.close();
		await browser.close();

		return librarySpaceAvailability;
	} catch (error) {
		console.log(error);
		await browser.close();
	}
}

async function main() {
	const xx = await libraryScrapper();

	console.log(xx);
}

main();
