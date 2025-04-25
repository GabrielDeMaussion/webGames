import { Component, OnInit } from '@angular/core';
import { Card, Preferences } from '../../interfaces/models';
import { GameService } from '../../services/game.service';
import { CardComponent } from '../assets/card/card.component';
import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../services/audio.service';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-solitary-game',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './solitary-game.component.html',
  styleUrl: './solitary-game.component.scss'
})
export class SolitaryGameComponent implements OnInit {
  selectedCards: Card[] = [];
  solitaryBoard: Card[][] = [];
  solitaryDeck: Card[] = [];
  availableCards: Card[] = [];
  acesCards: Card[] = [];
  fakeCards: Card[] = [];
  inGame : boolean = false;

  constructor(private readonly gameService: GameService,
    private readonly storageService: StorageService,
    private readonly userService: UserService,
    private readonly audioService: AudioService,
  ) {
  }


  //
  ngOnInit(): void {
    this.startGame();
  }


  //
  startGame() {
    this.solitaryDeck = this.gameService.generateSolitaryDeck();
    this.dealCards();
    this.createFakeCards();
    this.inGame = true;
    this.availableCards = [];
  }


  //
  dealCards() {
    this.solitaryBoard = [];
    for (let col = 0; col < 7; col++) {
      this.solitaryBoard.push([]);
      for (let row = 0; row < col + 1; row++) {
        let card = this.solitaryDeck.pop()!;
        card.isHidden = row < col;
        this.solitaryBoard[col].push(card);
      }
    }
    this.audioService.playDeckShuffle();
  }


  //
  getRandomCard() {
    if (this.solitaryDeck.length != 0) {
      if (this.availableCards.length >= 3) {
        this.solitaryDeck = [...this.availableCards.splice(0, 1), ...this.solitaryDeck];
      }
      this.availableCards.push(this.solitaryDeck.pop()!);
    }
    this.audioService.playCardDealRandom();
  }


  //
  getDeckBack() {
    let pref: Preferences = this.storageService.getPreferences(this.userService.getUsername()) as Preferences;
    return pref.cardBack;
  }

  clickCards(card: Card | null, event: MouseEvent, colIndex?: number) {
    event.stopPropagation();
    if(!this.inGame) return;

    if (card) {
      if (card.isHidden) return;

      if (card.name === 'A') {
        this.selectAces(card);
        this.audioService.playCardDealRandom();
      }
      else if (this.selectedCards.length === 0) {
        this.selectCards(card);
      }
      else {
        this.moveTo(card);
        this.audioService.playCardDealRandom();
      }
    }
    // 
    else if (colIndex !== undefined && this.solitaryBoard[colIndex].length == 0) {
      this.removeSelectedCards();

      this.solitaryBoard[colIndex!].push(...this.selectedCards);

      this.selectedCards.forEach((card) => {
        card.selected = false;
      });

      this.selectedCards = [];
      this.audioService.playCardDealRandom();
    }
    this.revealLastCard();
    this.checkWin();
  }


  //
  selectCards(card: Card) {
    //Si no es carta auxiliar (Esta en tablero)
    if (!this.availableCards.includes(card)) {
      let cardColIndex = this.solitaryBoard.findIndex((col) => col.includes(card));
      let cardRowIndex = this.solitaryBoard[cardColIndex].findIndex((c) => c === card);

      for (let row = cardRowIndex; row < this.solitaryBoard[cardColIndex].length; row++) {
        this.solitaryBoard[cardColIndex][row].selected = true;
        this.selectedCards.push(this.solitaryBoard[cardColIndex][row]);
      }
    }
    else {
      card.selected = true;
      this.selectedCards.push(card);
    }
  }


  //
  selectAces(card: Card) {
    if (!this.availableCards.includes(card)) {
      let cardColIndex = this.solitaryBoard.findIndex((col) => col.includes(card));
      let cardRowIndex = this.solitaryBoard[cardColIndex].indexOf(card);
      this.solitaryBoard[cardColIndex].splice(cardRowIndex, 1);
      this.acesCards.push(card);
    }
    else {
      let cardColIndex = this.availableCards.indexOf(card);
      this.availableCards.splice(cardColIndex, 1);
      this.acesCards.push(card);
    }
  }


  //
  moveTo(card: Card) {
    let order = ['K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];

    if (!card || !this.selectCards || this.availableCards.includes(card)) return;
    //Si se intenta colocar sobre una carta

    //Si el movimiento es valido, la coloca
    let colIndex = this.solitaryBoard.findIndex((col) => col.includes(card));
    let entryCard = this.selectedCards[0];

    if (
      order.indexOf(card.name) === order.indexOf(entryCard.name) - 1 &&
      card.color !== entryCard.color
    ) {
      this.removeSelectedCards();
      this.solitaryBoard[colIndex].push(...this.selectedCards);
    }

    this.selectedCards.forEach((card) => {
      card.selected = false;
    });
    this.selectedCards = [];
  }

  //Elimina la/s cartas seleccionadas de los arrays
  removeSelectedCards() {
    this.solitaryBoard = this.solitaryBoard.map((col) =>
      col.filter((card) => !card.selected)
    );

    this.availableCards = this.availableCards.filter((card) => !card.selected);

    this.selectedCards.forEach((card) => {
      card.selected = false;
    });
  }


  //
  revealLastCard() {
    for (let col = 0; col < this.solitaryBoard.length; col++) {
      if (this.solitaryBoard[col].length === 0) continue;
      let lastCard = this.solitaryBoard[col][this.solitaryBoard[col].length - 1];
      
      if (lastCard.isHidden) {
        lastCard.isHidden = false;
        this.audioService.playCardFlipRandom();
      }
    }
  }


  //
  getOpacity(card: Card) {
    return this.acesCards.find((ace) => ace.suit === card.suit) ? '' : 'opacity-25';
  }


  //
  createFakeCards() {
    this.fakeCards = [
      {
        value: 11,
        name: 'A',
        suit: 'heart',
        color: 'red',
        selected: false,
        isHidden: false
      },
      {
        value: 11,
        name: 'A',
        suit: 'spade',
        color: 'black',
        selected: false,
        isHidden: false
      },
      {
        value: 11,
        name: 'A',
        suit: 'club',
        color: 'black',
        selected: false,
        isHidden: false
      },
      {
        value: 11,
        name: 'A',
        suit: 'diamond',
        color: 'red',
        selected: false,
        isHidden: false
      }
    ]
  }

  //
  async checkWin() {
    let order = ['K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
    if (this.acesCards.length != 4 || this.solitaryDeck.length != 0) return;

    for (const col of this.solitaryBoard) {
      if (col.length === 0) continue;

      if (col.length !== order.length) return;

      for (let i = 0; i < order.length; i++) {
        if (col[i].name !== order[i]) return;
      }
    }

    this.inGame = false;
    await this.gameService.setDelay(500);
    this.gameService.sendAlert('Ganaste!', 'Felicidades, ganaste la partida', 'success');
  }
}
