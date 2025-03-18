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
  wordsGrid: string[][] = [];
  triedWord: string = '';
  rows: number[] = [0, 1, 2, 3, 4, 5];
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
    this.wordsGrid = Array.from({ length: 6 }, () => ['']);
    this.triedWord = '';

  }

  //Methods
  getLetterClass(letter: string, index: number): string {

    if (this.hiddenWord[index] == letter) {
      return 'letter-green';
    }
    else if (this.hiddenWord.includes(letter)) {
      return 'letter-yellow';
    }
    else if (!this.hiddenWord.includes(letter) && letter != ' ') {
      return 'letter-red';
    }

    return '';
  }


  checkWord() {
    let wordsList = this.getWord() as string[];
    let word = this.triedWord.toUpperCase();
    if (word.length != 5 || wordsList.includes(word)) {
      return;
    }

    this.pushWord(word);
    this.triedWord = '';

    if (this.hiddenWord == word) {
      this.audioService.playSuccess();
      alert('Fin del juego');
    }

    else if (this.wordsGrid[this.wordsGrid.length-1].join('') != '') {
      alert('Fin del juego');
    }

  }

  getWord(index: number = -1): string[] | string {

    if (index == -1) {
      let words: string[] = [];
      this.wordsGrid.forEach(word => {
        words.push(word.join(''));
      });

      return words
    }

    return this.wordsGrid[index].join('');
  }


  pushWord(word: string) {
    let wordsList = this.getWord() as string[];
    let index = wordsList.findIndex(w => w === '');
    if (index !== -1) {
      this.wordsGrid[index] = word.split('');
    }
  }


}
