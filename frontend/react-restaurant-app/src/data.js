import vanilla from './images/vanilla_ice_cream.png';
import strawberriesAndCream from './images/strawberries_and_cream.jpeg';
import banana from './images/banana_ice_cream.jpeg';
import doubleBagel from './images/bagel_ice_cream.jpeg';

const DATA = [
    {
        name: 'Venus Vanilla',
        desc: `Simple and powerful, just like Venus Williams' backhand.`,
        price: 3.99,
        imgSrc: vanilla,
        imgAlt: 'Venus Vanilla ice cream',
        id: 1,
    },
    {
        name: 'Strawberries & Cream',
        desc: `You'll feel like you're at Wimbledon with this classic.`,
        price: 4.99,
        imgSrc: strawberriesAndCream,
        imgAlt: 'Strawberries & Cream ice cream',
        id: 2,
    },
    {
        name: 'Around-The-Net Banana',
        desc: `Packed with enough bananas to spin your next forehand around the net.`,
        price: 4.59,
        imgSrc: banana,
        imgAlt: 'Around-The-Net Banana ice cream',
        id: 3,
    },
    {
        name: 'Double Bagel',
        desc: `This savory ice cream has EVERYTHING 😉 you need.`,
        price: 4.29,
        imgSrc: doubleBagel,
        imgAlt: 'Double Bagel ice cream',
        id: 4,
    }
]

export default DATA;