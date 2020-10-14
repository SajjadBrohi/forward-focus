interface Note {
	key: number;
	title: string;
	content: string;
}

const notes: Note[] = [
	{
		key: 1,
		title: 'Day 1',
		content:
			'Test note for a day',
	},
	{
		key: 2,
		title: 'Day 2',
		content:
			'Test note for a day',
	},
	{
		key: 3,
		title: 'Day 3',
		content:
			"Test note for a day",
	},
	{
		key: 4,
		title: 'Day 4',
		content:
			"Test note for a day",
	},
];

export default notes;
