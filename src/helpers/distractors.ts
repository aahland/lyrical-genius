

let distractors = [
	'Hells Bells', 'Soul man', 'The saftey dance', "Don't stop me now", 'Something', "Ain't no mountain high enough",
	'Push the button', 'Mr. Blue Sky', 'Disco Inferno', 'Wake me up before you go-go', 'Help', "Ain't no sunshine",
	'Honk tonk woman', 'No diggity', 'The winner takes it all', 'Walk on the wild side', 'Despacito', 'Rolling in the deep',
	'One', 'Heart of glass', 'Rockstar', 'Kiss', 'Wannabee', 'Bad', 'Genie in a bottle', 'Tik Tok', 'Losing my religion', 'Old town road',
	'Roar', 'Heart of gold', 'The real slim shady', 'Jump', 'Dancing Queen', 'Poker face', 'Toxic', "I'm yours",
	'Use somebody', 'Take on me', 'Heartbreak Hotel', 'Beautiful day', 'Umbrella', 'Under pressure', 'House of the rising sun',
	'Respect', 'Hot in here', 'YMCA', 'Sweet Child O’ Mine', 'Personal Jesus', 'Light my fire', 'Viva la vida', 'Stronger', 'Gimme Shelter',
	'More than a feeling', 'Can’t feel my face', 'Dancing in the dark', 'Roxanne', 'Thrift Shop', 'Eye of the tiger',
	'Africa', 'Work', 'Mirrors', 'Smoke on the water', 'Tears in heaven', 'Promiscuous', 'Money for nothing', 'Killing in the name', 'Dream on', 'War pigs',
	'Come as you are', 'Whole lotta love', 'September', 'Uptown funk', 'Time to pretend', 'I will survive', 'Just like heaven', 'Young americans', 'Lady marmalade',
	'Super freak', 'Sabotage', 'Last nite', 'Into the mystic', 'Runaway', 'Surrender', 'My sweet lord', 'Pressure drop', 'Beast of burden', 'Piano man', 'Fuck tha police',
	'Juicy', 'Enter sandman', 'Tiny dancer', 'Bitter sweet symphony', 'White room', 'Self esteem',
];

function getRandomDistractor() {
	return Math.floor(Math.random() * distractors.length);
}

export function getRandomDistractors() {
	let randomNumber1 = getRandomDistractor();
	let randomNumber2 = getRandomDistractor();
	if (randomNumber2 === randomNumber1) {
		randomNumber2 = randomNumber1 + 1
	}
	let randomNumber3 = getRandomDistractor();
	if (randomNumber3 === randomNumber2) {
		randomNumber3 = randomNumber2 + 1
	}
	let randomNumber4 = getRandomDistractor();
	if (randomNumber4 === randomNumber3) {
		randomNumber4 = randomNumber3 + 1
	}
	let randomNumber5 = getRandomDistractor();
	if (randomNumber5 === randomNumber4) {
		randomNumber5 = randomNumber4 + 1
	}
	let randomNumber6 = getRandomDistractor();
	if (randomNumber6 === randomNumber5) {
		randomNumber6 = randomNumber5 + 1
	}
	let randomNumber7 = getRandomDistractor();
	if (randomNumber7 === randomNumber6) {
		randomNumber7 = randomNumber6 + 1
	}
	let randomNumber8 = getRandomDistractor();
	if (randomNumber8 === randomNumber7) {
		randomNumber8 = randomNumber7 + 1
	}
	let eightDistractors = [distractors[randomNumber1], distractors[randomNumber2], distractors[randomNumber3], distractors[randomNumber4], distractors[randomNumber5], distractors[randomNumber6], distractors[randomNumber7], distractors[randomNumber8]]

	return eightDistractors;

}



