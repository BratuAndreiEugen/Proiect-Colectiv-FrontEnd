import {Recipe} from "./recipe";

export interface User {
    userId: string;
    username: string;
    description: string;
    recipes?: Recipe[];
}

export interface UserShort {
    id: string;
    username: string;
    description: string;
}
