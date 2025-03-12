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
    volume: number;
}