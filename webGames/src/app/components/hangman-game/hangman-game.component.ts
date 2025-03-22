import { Component, OnInit } from '@angular/core';
import { KeyboardComponent } from '../assets/keyboard/keyboard.component';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-hangman-game',
  standalone: true,
  imports: [KeyboardComponent],
  templateUrl: './hangman-game.component.html',
  styleUrl: './hangman-game.component.scss'
})
export class HangmanGameComponent implements OnInit {
  correctLetters: string[] = [];
  wrongLetters: string[] = [];
  hiddenWord: string = '';
  guessedLetters: string[] = [];
  lives: number = 6;
  remainingLives: number = 6;
  inGame: boolean = true;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.startGame();
  }

  startGame() {
    this.correctLetters = [];
    this.wrongLetters = [];
    this.hiddenWord = this.gameService.generateRandomHangmanWord().toUpperCase();
    this.guessedLetters = [];
    this.lives = 6;
    this.remainingLives = 6;
    this.inGame = true;
  }

  guessLetter(letter: string) {
    //Check if the letter is in the hidden word
    if (!this.guessedLetters.includes(letter) && this.inGame) {
      this.guessedLetters.push(letter);

      if (this.hiddenWord.includes(letter)) {
        this.correctLetters.push(letter);
      }
      else{
        this.wrongLetters.push(letter);
        this.remainingLives--;
      }

      this.checkWord()
      
      }
      console.log('Guessed letters:', this.guessedLetters);
    }

    showHiddenWord(){
      return this.hiddenWord.split('').map(letter => this.correctLetters.includes(letter) ? letter : '_').join(' ');
    }

    checkWord(){
      if(this.hiddenWord === this.showHiddenWord().toUpperCase().replace(/[^A-ZÁÉÍÓÚÑ]/g, '') && this.remainingLives > 0){
        this.inGame = false;
        this.gameService.sendAlert('Ganaste', 'Felicidades, has adivinado la palabra', 'success');
      }
      else if(this.remainingLives === 0){
        this.inGame = false;
        this.gameService.sendAlert('Perdiste', 'La palabra era: ' + this.hiddenWord, 'error');
      }
    }

    getLives(): string[] {
      let lives = [];
      for (let i = 0; i < this.lives; i++) {
        if (i < this.remainingLives) {
          lives.push('bi-heart-fill text-danger');
        } else {
          lives.push('bi-heartbreak-fill text-secondary');
        }
      }
      return lives;
    }
  }
