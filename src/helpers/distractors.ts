export let distractors = [
	'Hells Bells',
	'Soul man',
	'The saftey dance',
	"Don't stop me now",
	'Something',
	"Ain't no mountain high enough",
	'Push the button',
	'Mr. Blue Sky',
	'Disco Inferno',
	'Help',
	"Ain't no sunshine",
	'Honk tonk woman',
	'No diggity',
	'The winner takes it all',
	'Walk on the wild side',
	'Despacito',
	'Rolling in the deep',
	'One',
	'Heart of glass',
	'Rockstar',
	'Kiss',
	'Wannabee',
	'Bad',
	'Genie in a bottle',
	'Tik Tok',
	'Losing my religion',
	'Old town road',
	'Roar',
	'Heart of gold',
	'The real slim shady',
	'Jump',
	'Dancing Queen',
	'Poker face',
	'Toxic',
	"I'm yours",
	'Use somebody',
	'Take on me',
	'Heartbreak Hotel',
	'Beautiful day',
	'Umbrella',
	'Under pressure',
	'House of the rising sun',
	'Respect',
	'Hot in here',
	'YMCA',
	'Sweet Child O’ Mine',
	'Personal Jesus',
	'Light my fire',
	'Viva la vida',
	'Stronger',
	'Gimme Shelter',
	'More than a feeling',
	'Can’t feel my face',
	'Dancing in the dark',
	'Roxanne',
	'Thrift Shop',
	'Eye of the tiger',
	'Africa',
	'Work',
	'Mirrors',
	'Smoke on the water',
	'Tears in heaven',
	'Promiscuous',
	'Money for nothing',
	'Killing in the name',
	'Dream on',
	'War pigs',
	'Come as you are',
	'Whole lotta love',
	'September',
	'Uptown funk',
	'Time to pretend',
	'I will survive',
	'Just like heaven',
	'Young americans',
	'Lady marmalade',
	'Super freak',
	'Sabotage',
	'Last nite',
	'Into the mystic',
	'Runaway',
	'Surrender',
	'My sweet lord',
	'Pressure drop',
	'Beast of burden',
	'Piano man',
	'Fuck tha police',
	'Juicy',
	'Enter sandman',
	'Tiny dancer',
	'Bitter sweet symphony',
	'White room',
	'Self esteem'
];

function getRandomDistractor() {
	let randomNumber1 = Math.floor(Math.random() * distractors.length);
	let randomNumber2 = randomNumber1 - 1;
	if (randomNumber2 > distractors.length) {
		randomNumber2 = 0;
	}
	let randomNumbers = [randomNumber1, randomNumber2];
	return randomNumbers;
}

export function getRandomDistractors() {
	let randomNumbers = getRandomDistractor();
	let r1 = randomNumbers[0];
	let r2 = randomNumbers[1];

	let randomNumbers2 = getRandomDistractor();
	let r3 = randomNumbers2[0];
	let r4 = randomNumbers2[1];

	let randomNumbers3 = getRandomDistractor();
	let r5 = randomNumbers3[0];
	let r6 = randomNumbers3[1];

	let randomNumbers4 = getRandomDistractor();
	let r7 = randomNumbers4[0];
	let r8 = randomNumbers4[1];

	let randomNumbers5 = getRandomDistractor();
	let r9 = randomNumbers5[0];
	let r10 = randomNumbers5[1];

	let randomNumbers6 = getRandomDistractor();
	let r11 = randomNumbers6[0];
	let r12 = randomNumbers6[1];

	let randomNumbers7 = getRandomDistractor();
	let r13 = randomNumbers7[0];
	let r14 = randomNumbers7[1];

	let randomNumbers8 = getRandomDistractor();
	let r15 = randomNumbers8[0];
	let r16 = randomNumbers8[1];

	let randomNumbers9 = getRandomDistractor();
	let r17 = randomNumbers9[0];
	let r18 = randomNumbers9[1];

	let randomNumbers10 = getRandomDistractor();
	let r19 = randomNumbers10[0];
	let r20 = randomNumbers10[1];

	let randomNumbers11 = getRandomDistractor();
	let r21 = randomNumbers11[0];
	let r22 = randomNumbers11[1];

	let randomNumbers12 = getRandomDistractor();
	let r23 = randomNumbers12[0];
	let r24 = randomNumbers12[1];

	let twentyfourDistractors = [
		distractors[r1],
		distractors[r2],
		distractors[r3],
		distractors[r4],
		distractors[r5],
		distractors[r6],
		distractors[r7],
		distractors[r8],
		distractors[r9],
		distractors[r10],
		distractors[r11],
		distractors[r12],
		distractors[r13],
		distractors[r14],
		distractors[r15],
		distractors[r16],
		distractors[r17],
		distractors[r18],
		distractors[r19],
		distractors[r20],
		distractors[r21],
		distractors[r22],
		distractors[r23],
		distractors[r24]
	];

	return twentyfourDistractors;
}
