

let distractors = [
		'Hells Bells', 'Soul man', 'The saftey dance', "Don't stop me now", 'Something', "Ain't no mountain high enough",
		'Push the button', 'Mr. Blue Sky', 'Disco Inferno', 'Wake me up before you go-go', 'Help', "Ain't no sunshine",
		'Honk tonk woman', 'No diggity', 'The winner takes it all', 'Walk on the wild side', 'Despacito', 'Rolling in the deep',
		'One', 'Heart of glass', 'Rockstar', 'Kiss', 'Wannabee', 'Bad', 'Genie in a bottle', 'Tik Tok', 'Losing my religion', 'Old town road',
		'Roar', 'Heart of gold', 'The real slim shady', 'Jump', 'Dancing Queen', 'Poker face', 'Toxic', "I'm yours",
		'Use somebody', 'Take on me', 'Heartbreak Hotel', 'Beautiful day', 'Umbrella', 'Under pressure', 'House of the rising sun',
		'Respect', 'Hot in here', 'YMCA', 'Sweet Child O’ Mine', 'Personal Jesus', 'Light my fire', 'Viva la vida', 'Stronger', 'Gimme Shelter',
		'More than a feeling', 'Can’t feel my face', 'Dancing in the dark', 'Roxanne', 'Thrift Shop', 'Eye of the tiger',
		'Africa', 'Work', 'Mirrors', 'Smoke on the water', 'Tears in heaven', 'Promiscuous', 'Money for nothing'
	];

function getRandomDistractor() {
     return Math.floor(Math.random() * distractors.length);
}

export function getRandomDistractors() {
	let randomNumber1 = getRandomDistractor();
	let randomNumber2 = getRandomDistractor();
	let randomNumber3 = getRandomDistractor();
	let randomNumber4 = getRandomDistractor();
	let randomNumber5 = getRandomDistractor();
	let randomNumber6 = getRandomDistractor();
	let sixDistractors = [distractors[randomNumber1], distractors[randomNumber2], distractors[randomNumber3], distractors[randomNumber4], distractors[randomNumber5], distractors[randomNumber6] ]

	return sixDistractors;

}



