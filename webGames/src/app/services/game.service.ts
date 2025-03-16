import { Injectable } from '@angular/core';
import { Card } from '../interfaces/models';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { concat } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  suits = ['heart', 'diamond', 'club', 'spade'];
  colors = ['blue', 'indigo', 'purple', 'pink', 'red', 'orange', 'yellow', 'green', 'teal', 'cyan', 'black', 'gray'];

  constructor() { }


  //
  generateBlackjackDeck() {
    let deck: Card[] = [];

    this.suits.forEach(suit => {
      let color = (suit == 'heart' || suit == 'diamond') ? 'red' : 'black';
      let cards = this.generateSwit(suit, color);
      deck = deck.concat(cards);
    });

    return this.shuffle(deck);
  }


  //
  generateMemoryDeck(quantity: number = 20) {
    let colors = this.shuffle(this.colors);
    let deck: Card[] = [];

    while (deck.length < quantity) {
      let suit = this.suits[Math.floor(Math.random() * this.suits.length)];
      let color = colors.pop()!;

      let card = {
        value: 1,
        name: '',
        suit: suit,
        color: color,
        isHidden: false,
        selected: false
      };

      deck.push(card, { ...card });
    }

    return this.shuffle(deck);
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
  shuffle(list: any[]) {
    for (let index = list.length - 1; index > 0; index--) {
      const newIndex = Math.floor(Math.random() * (index + 1));
      [list[index], list[newIndex]] = [list[newIndex], list[index]];
    }

    return [...list];
  }


  //
  async setDelay(ms: number = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  //
  sendAlert(title: string, text: string, icon: SweetAlertIcon = 'info') {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: 'Ok'
    });
  }

}
