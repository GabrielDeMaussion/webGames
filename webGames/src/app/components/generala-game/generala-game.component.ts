import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { GameService } from '../../services/game.service';
import { GeneralaScore, Dice } from '../../interfaces/models';
import { AudioService } from '../../services/audio.service';
import { DiceComponent } from "../assets/dice/dice.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generala-game',
  standalone: true,
  imports: [DiceComponent, CommonModule],
  templateUrl: './generala-game.component.html',
  styleUrl: './generala-game.component.scss'
})
export class GeneralaGameComponent implements OnInit {
  dices: Dice[] = [];
  firstRoll = true;
  maxRolls = 3;
  rolls = 0;
  scores: GeneralaScore | null = null;

  @ViewChildren(DiceComponent) diceComponents!: QueryList<DiceComponent>;

  ngOnInit(): void {
    this.startGame();
  }

  constructor(
    private gameService: GameService,
    private audioService: AudioService
  ) { }

  startGame() {
    this.dices = this.gameService.generateDices();
    this.scores = {
      ones: 0,
      twos: 0,
      threes: 0,
      fours: 0,
      fives: 0,
      sixes: 0,
      flush: 0,
      full: 0,
      poker: 0,
      generala: 0,
      doubleGenerala: 0
    }
  }

  selectDice(index: number) {
    if (this.rolls === this.maxRolls || this.firstRoll) {
      return;
    }

    this.dices[index].selected = !this.dices[index].selected;
  }

  reRoll(rollAll: boolean = false) {
    if (this.firstRoll) {
      this.firstRoll = false;
      rollAll = true;
    }
    if ((this.dices.every((value) => value.selected == false) || (this.maxRolls <= this.rolls)) && !rollAll) {
      return;
    }

    let diceArray = this.diceComponents.toArray();

    this.audioService.playDiceRollRandom();

    for (let i = 0; i < this.dices.length; i++) {
      if (this.dices[i].selected || rollAll) {
        diceArray[i].rollDice();
      }
    }
    this.dices.map((_, i) => this.dices[i].selected = false);
    this.rolls++;
  }


  //
  setScore(score: keyof GeneralaScore) {
    if (this.scores![score] !== 0 || this.firstRoll) {
      return;
    }

    let value = this.getScore(score);
    this.scores![score] = value ? value : null;
    this.rolls = 0;
    this.firstRoll = true;
  }

  
  //
  getScore(scoreKey: keyof GeneralaScore) {
    if (this.scores![scoreKey] !== 0 || this.firstRoll) {
      return 0;
    }

    let numbersScoreKeys = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'];
    let diceNumber = numbersScoreKeys.indexOf(scoreKey) + 1;
    let score: number = 0;
    let diceScores = this.dices.map(dice => dice.value);

    if (numbersScoreKeys.includes(scoreKey)) {
      score = this.dices.filter(dice => dice.value === diceNumber).length * diceNumber;
    }

    else if (scoreKey === 'flush') {
      let min = Math.min(...this.dices.map(dice => dice.value));
      for (let i = 0; i < 5; i++) {
        if (!diceScores.includes(min + i)) {
          return 0;
        }
        
        score = 20;
      }
    }

    else if (scoreKey === 'full') {
      let counts = this.countDiceFaces(diceScores);
      let hasThree = false;
      let hasTwo = false;

      for (let key in counts) {
        if (counts[key] === 3) {
          hasThree = true;
        }
        else if (counts[key] === 2) {
          hasTwo = true;
        }
      }

      score = (hasThree && hasTwo) ? 30 : 0;
    }

    else if (scoreKey === 'poker') {
      let counts = this.countDiceFaces(diceScores);

      for (let key in counts) {
        if (counts[key] === 4) {
          score = 40;
          break;
        }
      }
    }

    else if (scoreKey === 'generala') {
      score = this.dices.every(dice => dice.value === this.dices[0].value) ? 50 : 0;
    }

    else if (scoreKey === 'doubleGenerala') {
      if (this.scores!.generala != 0) {
        score = this.dices.every(dice => dice.value === this.dices[0].value) ? 100 : 0;
      }
    }

    console.log('Guardando puntuacion de', scoreKey, 'con', score, 'puntos');

    return (score && this.rolls == 1 && !numbersScoreKeys.includes(scoreKey)) ? (score + 5) : score;
  }

  
  //
  countDiceFaces(arr: number[]): Record<number, number> {
    let conteo: Record<number, number> = {};

    arr.forEach(num => {
      conteo[num] = (conteo[num] || 0) + 1;
    });
    
    return conteo;
  }

  
  //
  calculateTotal(){
    let total = 0;
    
    for(let key in this.scores!) {
      const scoreKey = key as keyof GeneralaScore;
      if(this.scores![scoreKey] !== null){
        total += this.scores![scoreKey]!;
      }
    }

    return total;
  }
  
  getScoreClass(scoreKey: keyof GeneralaScore){
 
    if(this.scores![scoreKey] === null){
      return 'fw-bold text-danger';
    }
    
    else if(this.scores![scoreKey] !== 0){
      return 'fw-bold text-success';
    }
    
    return this.getScore(scoreKey) === 0 ? '' : 'fw-bold text-warning';
  }
}
