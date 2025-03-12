import { Injectable } from '@angular/core';
import { Card } from '../interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  suits = ['heart', 'diamond', 'club', 'spade'];
  colors = ['blue', 'indigo', 'purple', 'pink', 'red', 'orange', 'yellow', 'green', 'teal', 'cyan', 'black']

  constructor() { }

  
  //
  generateBlackjackDeck() {
    let deck: Card[] = [];

    this.suits.forEach(suit => {
      let color = (suit == 'heart' || suit == 'diamond') ? 'red' : 'black';
      let cards = this.generateSwit(suit, color);
      deck = deck.concat(cards);
    });

    return this.shuffleDeck(deck);
  }

  
  //
  generateSwit(suit: string, color: string): Card[] {
    let cards: Card[] = [];

    for (let index = 2; index <= 10; index++) {
      let card: Card = { value: index, name: index.toString(), suit: suit, color: color, isHidden: false, selected: false };
      cards.push(card);
    }

    let figures = ['J', 'Q', 'K'];
    for (let index = 0; index < figures.length; index++) {
      let card: Card = { value: 10, name: figures[index], suit: suit, color: color, isHidden: false, selected: false };
      cards.push(card);
    }

    let cardA: Card = { value: 11, name: 'A', suit: suit, color: color, isHidden: false, selected: false };
    cards.push(cardA);

    return cards;
  }

  
  //
  shuffleDeck(deck: Card[]) {
    for (let index = deck.length - 1; index > 0; index--) {
      const newIndex = Math.floor(Math.random() * (index + 1));
      [deck[index], deck[newIndex]] = [deck[newIndex], deck[index]];
    }
    
    return deck;
  }

  
  //
  async setDelay(ms: number = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

}
