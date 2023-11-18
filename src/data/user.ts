import {Recipe} from "./recipe";

export interface User {
    userId: string;
    username: string;
    description: string;
    recipes: Recipe[];
}

export const users: User[] = [
    {
        userId: '1',
        username: 'chefluigi',
        description: 'Passionate chef exploring the world of flavors.',
        recipes: [
            {
                id: 1,
                username: 'chefluigi',
                title: 'Spaghetti Carbonara',
                photoUrl: 'https://hips.hearstapps.com/hmg-prod/images/hdm-chickencorbonara-14753-1564436398.jpg?crop=0.668xw:1.00xh;0.167xw,0&resize=1200:*',
            },
            //alte rețete
        ],
    },
    {
        userId: '2',
        username: 'bakerjane',
        description: 'Baker with a passion for creating delicious desserts.',
        recipes: [
            {
                id: 2,
                title: 'Classic Cheesecake',
                username: 'bakerjane',
                photoUrl: 'https://assets.epicurious.com/photos/62bdc36d9de40a39de6bd598/16:9/w_6270,h_3527,c_limit/Cheesecake_RECIPE_062922_36317.jpg',
            },
        ],
    },
];
