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
    ones: number | null;
    twos: number | null;
    threes: number | null;
    fours: number | null;
    fives: number | null;
    sixes: number | null;
    flush: number | null;
    full: number | null;
    poker: number | null;
    generala: number | null;
    doubleGenerala: number | null;
}

export interface Dice{
    value: number;
    selected: boolean;
}

export interface MineSweeperBlock{
    isMine: boolean;
    isFlagged: boolean;
    isRevealed: boolean;
}