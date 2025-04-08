import { Component, OnInit } from '@angular/core';
import { Ship } from '../../interfaces/models';
import { GameService } from '../../services/game.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-battleship-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './battleship-game.component.html',
  styleUrl: './battleship-game.component.scss'
})
export class BattleshipGameComponent implements OnInit {
  computerGrid: string[][] = [];
  playerGrid: string[][] = [];
  playerShips: Ship[] = [];
  computerShips: Ship[] = [];
  playerName: string = '';
  inGame: boolean = false;

  playerGuesses: number[][] = [];
  computerGuesses: number[][] = [];

  constructor(
    private readonly gameService: GameService,
    private readonly userService: UserService,
    private readonly audioService: AudioService
  ) { }


  //
  ngOnInit(): void {
    this.startGame();
  }


  //
  startGame() {
    this.computerShips = this.gameService.generateBattleshipPieces(1, 2, 2, 3);
    this.playerShips = this.gameService.generateBattleshipPieces(1, 2, 2, 3);

    this.computerGrid = this.gameService.generateBattleshipGrid(10, 10, this.computerShips);
    this.playerGrid = this.gameService.generateBattleshipGrid(10, 10);

    this.playerGuesses = [];
    this.computerGuesses = [];

    this.playerName = this.userService.getUsername();
    this.inGame = true;
  }

  getGridIcon(colIndex: number, rowIndex: number, playerGrid: boolean): string {
    let cell = playerGrid ? this.playerGrid[colIndex][rowIndex] : this.computerGrid[colIndex][rowIndex];
    let guesses = playerGrid ? this.computerGuesses : this.playerGuesses;

    for (let guess of guesses) {
      if (guess[0] === colIndex && guess[1] === rowIndex) {
        return cell != '' ? 'bi-x-lg text-danger' : 'bi-water text-primary';
      }
    }
    return 'bi-square-fill text-secondary';
  }

  shoot(colIndex: number, rowIndex: number) {
    if (!this.inGame || this.playerGuesses.includes([colIndex, rowIndex])) return;
    
    this.playerGuesses.push([colIndex, rowIndex]);

    if(this.computerGrid[colIndex][rowIndex] != '') {
      this.audioService.playShot();
    }
    else{
      this.audioService.playWater();
    }
  }
}
