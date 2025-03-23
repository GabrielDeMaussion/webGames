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
export class GeneralaGameComponent implements OnInit{
  dices : Dice[] = [];

  @ViewChildren(DiceComponent) diceComponents!: QueryList<DiceComponent>;

  ngOnInit(): void {
    this.startGame();
  }

  constructor(
    private gameService: GameService,
    private audioService: AudioService
  ) { }

  startGame(){
    this.dices = this.gameService.generateDices();
  }

  selectDice(index: number) {
    this.dices[index].selected = !this.dices[index].selected;
    console.log(this.dices);
  }

  reRoll() {
    if (this.dices.every((value) => value.selected == false)) {
      return;
    }

    let diceArray = this.diceComponents.toArray();

      this.audioService.playDiceRollRandom();

      for (let i = 0; i < this.dices.length; i++) {
        if (this.dices[i].selected) {
          diceArray[i].rollDice();
        }
      }
      this.dices.map((_, i) => this.dices[i].selected = false);
  }
}
