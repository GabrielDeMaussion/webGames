import { Component, OnInit } from '@angular/core';
import { Card } from '../../interfaces/models';
import { GameService } from '../../services/game.service';
import { CardComponent } from "../assets/card/card.component";
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-memory-game',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './memory-game.component.html',
  styleUrl: './memory-game.component.scss'
})
export class MemoryGameComponent implements OnInit {
  remainingLives: number = 0;
  memoryDeck: Card[] = [];
  selectedCards: Card[] = [];
  checkingMatch: boolean = false;
  inGame: boolean = false;
  dificulty: any = {
    deckSize: 24,
    lives: 0,
    viewDelay: 2000,
    cardSize: 'small'
  }

  constructor(
    private readonly gameService: GameService,
    private readonly audioService: AudioService
  ) { }

  ngOnInit() {
    this.startGame();
  }


  async startGame() {
    this.inGame = true;
    this.memoryDeck = [];
    this.dificulty = await this.selectDifficulty();
    this.memoryDeck = this.gameService.generateMemoryDeck(this.dificulty.deckSize);
    this.remainingLives = this.dificulty.lives;
    this.selectedCards = [];
    
    await this.hiddeCards(this.dificulty.viewDelay);
  }


  getLives(): string[] {
    let lives = [];
    for (let i = 0; i < this.dificulty.lives; i++) {
      if (i < this.remainingLives) {
        lives.push('bi-heart-fill text-danger');
      } else {
        lives.push('bi-heartbreak-fill text-secondary');
      }
    }
    return lives;
  }

  async flipCard(card: Card) {
    if (!this.selectedCards.includes(card) && card.isHidden && !this.checkingMatch && this.remainingLives > 0) {
      this.checkingMatch = true;
      card.isHidden = !card.isHidden;
      this.audioService.playCardDealRandom();
      this.selectedCards.push(card);
      if (this.selectedCards.length == 2) {
        await this.gameService.setDelay(1000);
        if (this.selectedCards[0].color != this.selectedCards[1].color || this.selectedCards[0].suit != this.selectedCards[1].suit) {
          this.selectedCards[0].isHidden = true;
          this.selectedCards[1].isHidden = true;
          this.remainingLives--;
          this.audioService.playCardFlipRandom();
        }
        else {
          this.audioService.playSuccess();
        }
        this.selectedCards = [];
      }

      this.checkGameStatus();
      this.checkingMatch = false;
    }
  }

  checkGameStatus() {
    if (this.remainingLives <= 0) {
      this.gameService.sendAlert('Fin del juego', 'Te quedaste sin vidas', 'error');
      this.inGame = false;
    }
    else if (this.memoryDeck.every(card => !card.isHidden)) {
      this.gameService.sendAlert('Fin del juego', 'Ganaste!', 'success');
      this.inGame = false;
    }
  }
  
  async hiddeCards(delay: number = 2000) {
    await this.gameService.setDelay(delay);
    this.audioService.playCardFlipRandom();
    this.memoryDeck.forEach(card => card.isHidden = true);
  }
  
  selectDifficulty() {
    let difficulty = this.gameService.requestDifficulty(['Easy', 'Medium', 'Hard', 'Extreme']);
    return difficulty.then((result: any) => {
      switch (result) {
        case 0:
          return { deckSize: 12, lives: 10, viewDelay: 3000, cardSize: 'medium' };
        case 1:
          return { deckSize: 12, lives: 6, viewDelay: 2500, cardSize: 'medium' };
        case 2:
          return { deckSize: 24, lives: 10, viewDelay: 2000, cardSize: 'small' };
        case 3:
          return { deckSize: 24, lives: 6, viewDelay: 1800, cardSize: 'small' };
        default:
          return { deckSize: 24, lives: 12, viewDelay: 2000, cardSize: 'small' };
      }
    }
    );
  }

}
