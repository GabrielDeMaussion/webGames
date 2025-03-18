import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { AudioService } from '../../services/audio.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wordle-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wordle-game.component.html',
  styleUrl: './wordle-game.component.css'
})
export class WordleGameComponent implements OnInit {
  //Attributes
  hiddenWord: string = '';
  wordGuesses: string[] = [];
  wordsGrid: string[] = [];
  guessedWord: string = '';
  cols: number[] = [0, 1, 2, 3, 4];

  constructor(
    private readonly gameService: GameService,
    private readonly audioService: AudioService
  ) { }

  ngOnInit(): void {
    this.startGame();
    console.log('Palabra oculta:', this.hiddenWord);

  }


  startGame() {
    this.hiddenWord = this.gameService.generateRandomWord().toUpperCase();
    this.wordGuesses = Array(6).fill('');
    this.wordsGrid = [...this.wordGuesses];
    this.guessedWord = '';

  }

  //Methods
  getLetterClass(wordIndex: number, charIndex: number): string {
    let letter = this.wordGuesses[wordIndex][charIndex];
    if (!letter) {
      return '';
    }
    else if (this.hiddenWord[charIndex] == letter) {
      return 'letter-green';
    }
    else if (this.hiddenWord.includes(letter)) {
      return 'letter-yellow';
    }
    else {
      return 'letter-red';
    }
  }


  checkWord() {
    let word = this.guessedWord.toUpperCase().replace(/[^A-ZÁÉÍÓÚÑ]/g, '');
    
    if (word.length != 5 || this.wordGuesses.includes(word)) {
      return;
    }

    this.pushWord(word);

    if (this.hiddenWord == word) {
      this.audioService.playSuccess();
      console.log('Ganaste');
      
    }

    else if (this.wordGuesses[this.wordGuesses.length-1] != '') {
      console.log('Perdiste');
    }

  }


  async pushWord(word: string) {
    let index = this.wordsGrid.findIndex(w => String(w).toUpperCase() === this.guessedWord.toUpperCase());    
    
    if (index !== -1) {
      for (const letter of word.split('')) {
        this.wordGuesses[index] += letter; 
        await this.gameService.setDelay(300);
      }
      this.wordsGrid = [...this.wordGuesses];
      this.guessedWord = '';
    }
  }
  
  
  showWord() {
    this.guessedWord = this.guessedWord.toUpperCase().replace(/[^A-ZÁÉÍÓÚÑ]/g, '');
    let index = this.wordGuesses.findIndex(w => w === '');
    if (index !== -1) {
      this.wordsGrid[index] = this.guessedWord;
    }
  }
  
  focusInput(){
    document.getElementById('wordInput')?.focus();
  }


}
