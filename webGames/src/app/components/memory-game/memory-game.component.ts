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
  styleUrl: './memory-game.component.css'
})
export class MemoryGameComponent implements OnInit {
  remainingLives: number = 7;
  memoryDeck: Card[] = [];
  selectedCards: Card[] = [];
  checkingMatch: boolean = false;
  dificulty: any = {
    deckSize: 24,
    lives: 12,
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
    this.memoryDeck = [];
    this.selectDifficulty();
    this.memoryDeck = this.gameService.generateMemoryDeck(this.dificulty.deckSize);
    this.remainingLives = this.dificulty.lives;
    this.selectedCards = [];
    
    await this.hiddeCards();
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
    }
    else if (this.memoryDeck.every(card => !card.isHidden)) {
      this.gameService.sendAlert('Fin del juego', 'Ganaste!', 'success');
    }
  }
  
  async hiddeCards() {
    await this.gameService.setDelay(2000);
    this.memoryDeck.forEach(card => card.isHidden = true);
  }
  
  selectDifficulty() {
    
  }

}
