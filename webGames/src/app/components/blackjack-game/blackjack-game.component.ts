import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Card, Preferences } from '../../interfaces/models';
import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user.service';
import { CardComponent } from "../assets/card/card.component";
import { AudioService } from '../../services/audio.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blackjack-game',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './blackjack-game.component.html',
  styleUrl: './blackjack-game.component.css'
})
export class BlackjackGameComponent implements OnInit {
  username: string = "";
  blackjackDeck: Card[] = [];
  playerHand: Card[] = [];
  dealerHand: Card[] = [];
  inGame: boolean = false;
  inPlayersTurn: boolean = false;
  userPreferences: Preferences | null = null;

  constructor(
    private readonly storageService: StorageService,
    private readonly userService: UserService,
    private readonly gameService: GameService,
    private readonly audioService: AudioService
  ) { }


  //Initializes the game setting the user preferences and the username
  ngOnInit(): void {
    this.userPreferences = this.storageService.getPreferences(this.userService.getUsername()) as Preferences;
    this.username = this.userService.getUsername();
  }


  //Function to start the game
  async startGame() {
    if (this.inGame) return;
    this.inGame = true;

    this.blackjackDeck = this.gameService.generateBlackjackDeck();
    this.playerHand = [];
    this.dealerHand = [];


    await this.dealCards(this.playerHand, this.blackjackDeck, 300);
    await this.dealCards(this.dealerHand, this.blackjackDeck, 300);
    await this.dealCards(this.playerHand, this.blackjackDeck, 300);
    await this.dealCards(this.dealerHand, this.blackjackDeck, 300, true);
    await this.checkGameStatus();
    
    this.inPlayersTurn = true;
  }

  
  //Function to deal the cards
  async dealCards(hand: Card[], deck: Card[], delay: number = 1000, hidden: boolean = false) {
    let card = deck.pop() as Card;
    card.isHidden = hidden;
    hand.push(card);

    this.audioService.playCardDealRandom();
    await this.gameService.setDelay(delay);
  }

  
  //Function to hit
  async hit() {
    await this.dealCards(this.playerHand, this.blackjackDeck);

    if (this.getHandTotal(this.playerHand) >= 21) {
      await this.stand();
    }
  }

  
  //Function to stand
  async stand() {
    this.inPlayersTurn = false;
    await this.revealDealerHand();
    while (this.getHandTotal(this.dealerHand) < 17) {
      await this.dealCards(this.dealerHand, this.blackjackDeck);
    }

    this.endGame();
  }

  
  //Function to reveal the dealer hand
  async revealDealerHand() {
    this.dealerHand.forEach(card => {
      card.isHidden = false;
      this.audioService.playCardFlipRandom();
    });

    await this.gameService.setDelay(1000);
  }

  
  //Function to get the total value of the hand
  getHandTotal(hand: Card[], getHidden: boolean = false): number {
    let score: number = 0;
    let aceCount: number = 0;

    hand.forEach(card => {
      if (!card.isHidden || getHidden) {
        score += card.value;
        if (card.name === 'A') {
          aceCount++;
        }
      }
    });

    while (score > 21 && aceCount > 0) {
      score -= 10;
      aceCount--;
    }

    return score;
  }

  
  //Checks the game status 
  async checkGameStatus() {
    let playerTotal = this.getHandTotal(this.playerHand, true);
    let dealerTotal = this.getHandTotal(this.dealerHand, true);

    console.log("Player Total: " + playerTotal);
    console.log("Dealer Total: " + dealerTotal);

    if (playerTotal >= 21 || dealerTotal >= 21) {
      alert("Blackjack");
      this.stand();
    } 
    
  }

  
  //
  endGame() {
    this.inGame = false;
    let playerTotal = this.getHandTotal(this.playerHand, false);
    let dealerTotal = this.getHandTotal(this.dealerHand, false);
    
    if(playerTotal > 21) {
      this.gameService.sendAlert("Bust", "Te pasaste de 21. ¡Perdiste!", 'error');
    }
    else if (playerTotal > dealerTotal || dealerTotal > 21) {
      this.gameService.sendAlert("Victoria", "¡Ganaste!", 'success');
    }
    else if (playerTotal < dealerTotal) {
      this.gameService.sendAlert("Derrota", "¡Perdiste!", 'error');
    }
    else {
      this.gameService.sendAlert("Empate", "¡Es un empate!", 'info');
    }
  }

}
