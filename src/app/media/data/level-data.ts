import { Level } from '../../classes/level';

const IMAGE_FOLDER = './app/media/images/';

export const LevelData: Level[] = [
  {
    id: 0,
    name: "hunger",
    degradeRate: .15,
    currentPercent: .5,
    imageUrl: IMAGE_FOLDER + 'hunger-green.svg',
    details: [
      'Snacks like crisps or chocolate: +15%',
      'Small meal like sandwiches: +30%',
      'Regular meal for dinner: +75%',
      'Large meal like all you can eat: +100%'
    ]
  },
  {
    id: 1,
    name: "thirst",
    degradeRate: .25,
    currentPercent: 1,
    imageUrl: IMAGE_FOLDER + 'drinking-green.svg',
    details: [
      'Pint of Beer: +5%',
      'Small fizzy drink: +20%',
      'Cup of tea or coffee: +25%',
      'Large fizzy drink: +40%',
      'Glass of water: +50%'
    ]
  },
  {
    id: 2,
    name: "sleep",
    currentPercent: 1,
    degradeRate: .05,
    imageUrl: IMAGE_FOLDER + 'sleeping-green.svg',
    details: [
      'Quick nap: +15%',
      '1-4 hours: +30%',
      '5-6 hours: +60%',
      '7+ hours: +100%',
      'Drink some Coffee: +10%'
    ]

  },
  {
    id: 3,
    name: "exercise",
    currentPercent: 1,
    degradeRate: .075,
    imageUrl: IMAGE_FOLDER + 'exercise-green.svg',
    details: [
      'Walk to the shop: +15%',
      'Push ups: +15%',
      'Run for 20 mins: +30%',
      'Gym session: +100%'
    ]
  },
  {
    id: 4,
    name: "hygiene",
    currentPercent: 1,
    degradeRate: .1,
    imageUrl: IMAGE_FOLDER + 'showering-green.svg',
    details: [
      'Clean teeth: +15%',
      'Wash hands: +15%',
      'Wash face: +25%',
      'Shower or Bath: +100%'
    ]
  },
  {
    id: 5,
    name: "bathroom",
    currentPercent: 1,
    degradeRate: .2,
    imageUrl: IMAGE_FOLDER + 'bathroom-green.svg',
    details: [
      'Pee: +30%',
      'Poop: +50%',
      'Combo!: +75%'      
    ]
  },
  {
    id: 6,
    name: "fun",
    currentPercent: 1,
    degradeRate: .15,
    imageUrl: IMAGE_FOLDER + 'billiard-green.svg',
    details: [
      'Play games for 30 mins: +15%',
      'Play/Watch sport: +30%',
      'Night out with friends: +60%',
      'Trolling Youtube comment sections: +100%'
    ]
  }
];