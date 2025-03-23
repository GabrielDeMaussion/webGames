export class Card{
    value: number = 1;
    name: string = 'A';
    suit: string = 'heart';
    color: string = 'black';
    isHidden: boolean = false;
    selected: boolean = false;
}

export interface Preferences{
    username: string;
    darkMode: boolean;
    cardBack: string;
    effectsVolume: number;
    musicVolume: number;
}

export interface GeneralaScore{
    ones: number;
    twos: number;
    threes: number;
    fours: number;
    fives: number;
    sixes: number;
    double: number;
    full: number;
    poker: number;
    generala: number;
    doubleGenerala: number;
}

export interface Dice{
    value: number;
    selected: boolean;
}