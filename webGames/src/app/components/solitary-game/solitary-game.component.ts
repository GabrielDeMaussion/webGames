import { Component, OnInit } from '@angular/core';
import { Card, Preferences } from '../../interfaces/models';
import { GameService } from '../../services/game.service';
import { CardComponent } from '../assets/card/card.component';
import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

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

  constructor(private readonly gameService: GameService,
    private readonly storageService: StorageService,
    private readonly userService: UserService
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
  }


  //
  dealCards() {
    for (let col = 0; col < 7; col++) {
      this.solitaryBoard.push([]);
      for (let row = 0; row < col + 1; row++) {
        let card = this.solitaryDeck.pop()!;
        card.isHidden = row < col;
        this.solitaryBoard[col].push(card);
      }
    }
  }


  //
  getRandomCard() {
    if (this.availableCards.length < 3 && this.solitaryDeck) {
      this.availableCards.push(this.solitaryDeck.pop()!);
    }
  }


  //
  getDeckBack() {
    let pref: Preferences = this.storageService.getPreferences(this.userService.getUsername()) as Preferences;
    return pref.cardBack;
  }

  clickCards(card: Card) {
    alert('Clickeando')
    if (card.isHidden) return;

    if (card.name === 'A') {
      this.selectAces(card);
    }
    else if (this.selectedCards.length === 0) {
      this.selectCards(card);
    }
    else {
      this.moveTo(card);
    }

    this.revealLastCard();
    
    console.log('Cartas seleccionadas:', this.selectedCards);
    console.log('Cartas en tablero:', this.solitaryBoard);
    
  }


  //
  selectCards(card: Card) {
    alert('Seleccionando')
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
    alert('As')
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
  moveTo(card: Card | null, row: Card[] = []) {
    let order = ['K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];

    if ((!card && row.length > 0 ) || !this.selectCards) return;
    alert('Moviendo')
    //Si se intenta colocar sobre una carta
    if (card) {
      alert('Colocando')
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

    //Si se intenta colocar sobre una columna vacia
    else if (row && row.length === 0) {
      alert('Colocando en vacio')
      this.removeSelectedCards();
      console.log('Fila antes de pushear', row);
      console.log('Cartas seleccionadas:', this.selectedCards);
      
      row.push(...this.selectedCards);
      
      console.log('Fila despues de pushear', row);
      console.log('Cartas seleccionadas despues:', this.selectedCards);
      
      this.selectedCards.forEach((card) => {
        card.selected = false;
      });
      this.selectedCards = [];
    }    
  }
  
  test(row: Card[]) {
    row.push(...this.selectedCards);
  }


  //Elimina la/s cartas seleccionadas de los arrays
  removeSelectedCards() {
    alert('Limpiando')
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
      lastCard.isHidden = false;
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



  // //
  // selectCards(card: Card) {
  //   if (card.isHidden) return;

  //   if (card.name === 'A') {

  //     if(!this.availableCards.includes(card)) {
  //       let cardColIndex = this.solitaryBoard.findIndex((col) => col.includes(card));
  //       let cardRowIndex = this.solitaryBoard[cardColIndex].indexOf(card);
  //       this.solitaryBoard[cardColIndex].splice(cardRowIndex, 1);
  //       this.acesCards.push(card);
  //     }
  //     else {
  //       let cardColIndex = this.availableCards.indexOf(card);
  //       this.availableCards.splice(cardColIndex, 1);
  //       this.acesCards.push(card);
  //     }

  //     this.revealLastCard();
  //     return;
  //   }


  //   //Si esta seleccionando
  //   if (this.selectedCards.length === 0) {

  //     //Si no es carta auxiliar (Esta en tablero)
  //     if (!this.availableCards.includes(card)) {
  //       let cardColIndex = this.solitaryBoard.findIndex((col) => col.includes(card));
  //       let cardRowIndex = this.solitaryBoard[cardColIndex].findIndex((c) => c === card);

  //       for (let row = cardRowIndex; row < this.solitaryBoard[cardColIndex].length; row++) {
  //         this.solitaryBoard[cardColIndex][row].selected = true;
  //         this.selectedCards.push(this.solitaryBoard[cardColIndex][row]);
  //       }
  //     }

  //     //Si es carta auxiliar (Esta en mazo)
  //     else if (this.availableCards.includes(card)) {
  //       card.selected = true;
  //       this.selectedCards.push(card);
  //     }
  //   } 

  //   //Si esta colocando
  //   else {
  //     this.moveTo(card);
  //   }

  //   this.revealLastCard();
  // }
}
