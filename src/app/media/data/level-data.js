"use strict";
var IMAGE_FOLDER = './app/media/images/';
exports.LevelData = [
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
            'Snacks like crisps or chocolate: +15%',
            'Small meal like sandwiches: +30%',
            'Regular meal for dinner: +75%',
            'Large meal like all you can eat: +100%'
        ]
    },
    {
        id: 2,
        name: "sleep",
        currentPercent: 1,
        degradeRate: .05,
        imageUrl: IMAGE_FOLDER + 'sleeping-green.svg',
        details: [
            'Snacks like crisps or chocolate: +15%',
            'Small meal like sandwiches: +30%',
            'Regular meal for dinner: +75%',
            'Large meal like all you can eat: +100%'
        ]
    },
    {
        id: 3,
        name: "exercise",
        currentPercent: 1,
        degradeRate: .075,
        imageUrl: IMAGE_FOLDER + 'exercise-green.svg',
        details: [
            'Snacks like crisps or chocolate: +15%',
            'Small meal like sandwiches: +30%',
            'Regular meal for dinner: +75%',
            'Large meal like all you can eat: +100%'
        ]
    },
    {
        id: 4,
        name: "hygiene",
        currentPercent: 1,
        degradeRate: .1,
        imageUrl: IMAGE_FOLDER + 'showering-green.svg',
        details: [
            'Snacks like crisps or chocolate: +15%',
            'Small meal like sandwiches: +30%',
            'Regular meal for dinner: +75%',
            'Large meal like all you can eat: +100%'
        ]
    },
    {
        id: 5,
        name: "bathroom",
        currentPercent: 1,
        degradeRate: .2,
        imageUrl: IMAGE_FOLDER + 'bathroom-green.svg',
        details: [
            'Snacks like crisps or chocolate: +15%',
            'Small meal like sandwiches: +30%',
            'Regular meal for dinner: +75%',
            'Large meal like all you can eat: +100%'
        ]
    },
    {
        id: 6,
        name: "fun",
        currentPercent: 1,
        degradeRate: .15,
        imageUrl: IMAGE_FOLDER + 'billiard-green.svg',
        details: [
            'Snacks like crisps or chocolate: +15%',
            'Small meal like sandwiches: +30%',
            'Regular meal for dinner: +75%',
            'Large meal like all you can eat: +100%'
        ]
    }
];
//# sourceMappingURL=level-data.js.map