

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
	let random1 = Math.floor(Math.random() * distractors.length);
	let random2 = random1 + 1
	if (random2 > distractors.length) {
		random2 = 0
	}
	let randomNumbers = [random1, random2]
	return randomNumbers
}



export function getRandomDistractors() {
	let randomNumber = getRandomDistractor();
	let r1 = randomNumber[0];
	let r2 = randomNumber[1];

	let randomNumber2 = getRandomDistractor();
	let r3 = randomNumber2[0];
	let r4 = randomNumber2[1];

	let randomNumber3 = getRandomDistractor();
	let r5 = randomNumber3[0];
	let r6 = randomNumber3[1];

	let randomNumber4 = getRandomDistractor();
	let r7 = randomNumber4[0];
	let r8 = randomNumber4[1];



	

	let eightDistractors = [distractors[r1], distractors[r2], distractors[r3], distractors[r4], distractors[r5], distractors[r6], distractors[r7], distractors[r8]]
	
	
	return eightDistractors;

}



