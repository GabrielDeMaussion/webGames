import { Component, OnInit } from '@angular/core';
import { Card, Preferences } from '../../interfaces/models';
import { GameService } from '../../services/game.service';
import { CardComponent } from '../assets/card/card.component';
import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-solitary-game',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './solitary-game.component.html',
  styleUrl: './solitary-game.component.scss'
})
export class SolitaryGameComponent implements OnInit {
  selectedCards: Card[] = [];
  solitaryTableBoard: Card[][] = [];
  solitaryDeck: Card[] = [];
  availableCards: Card[] = [];
  acesDeck: Card[] = [];

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
  }


  //
  dealCards() {
    for (let col = 0; col < 7; col++) {
      this.solitaryTableBoard.push([]);
      for (let row = 0; row < col + 1; row++) {
        let card = this.solitaryDeck.pop()!;
        card.isHidden = row < col;
        this.solitaryTableBoard[col].push(card);
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


  //
  selectCard(card: Card) {
    if (card.isHidden) return;

    if (this.selectedCards.length === 0) {
      //CARTAS AUXILIARES
      if (this.availableCards.includes(card)) {
        this.selectedCards.push(card);
        alert("Card selected");
        card.selected = true;
      }
      //CARTAS DEL TABLERO
      else {
        let cardColIndex = this.solitaryTableBoard.findIndex((col) => col.includes(card));
        let cardRowIndex = this.solitaryTableBoard[cardColIndex].indexOf(card);

        for (let row = cardRowIndex; row < this.solitaryTableBoard[cardColIndex].length; row++) {
          this.solitaryTableBoard[cardColIndex][row].selected = true;
          this.selectedCards.push(this.solitaryTableBoard[cardColIndex][row]);
        }
        console.log(this.selectedCards);
      }
    }
    else {
      this.checkMove(card);
    }
    this.revealLastCard();
  }


  //
  checkMove(card: Card) {
    let order = ['K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
    let colIndex = this.solitaryTableBoard.findIndex((col) => col.includes(card));

    if (order.indexOf(card.name) === order.indexOf(this.selectedCards[0].name) - 1 && card.suit !== this.selectedCards[0].suit) {
      this.solitaryTableBoard = this.solitaryTableBoard.map((col) =>
        col.filter((card) => !card.selected)
      );

      this.solitaryTableBoard[colIndex].push(...this.selectedCards);

    }
    this.selectedCards.forEach((card) => {
      card.selected = false;
    });

    this.selectedCards = [];

  }



  //
  revealLastCard() {
    for (let col = 0; col < this.solitaryTableBoard.length; col++) {
      this.solitaryTableBoard[col][this.solitaryTableBoard[col].length - 1].isHidden = false;
    }
  }
}
