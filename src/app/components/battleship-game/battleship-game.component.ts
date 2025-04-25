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
  playerTurn: boolean = false;

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
    this.playerTurn = true;

    console.log('Computer grid: ', this.computerGrid);
    console.log('Computer ships: ', this.computerShips);

    console.log('Player grid: ', this.playerGrid);
    console.log('Player ships: ', this.playerShips);
  }


  //
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


  //
  async clickGrid(colIndex: number, rowIndex: number){
    if (!this.inGame || !this.playerTurn) return;
    this.playerTurn = false;
    this.shoot(colIndex, rowIndex, this.computerGrid, this.playerGuesses);
    
    await this.gameService.setDelay(700);

    this.computerTurn();
    
    this.checkShips(this.computerShips, this.playerGuesses);
    //this.checkShips(this.playerShips, this.computerGuesses);
    this.playerTurn = true;
  }


  //
  shoot(colIndex: number, rowIndex: number, grid : string[][], guesses : number[][]) : boolean {
    if (!this.inGame) return false;

    for (let i = 0; i < guesses.length; i++) {
      if (guesses[i][0] === colIndex && guesses[i][1] === rowIndex) {
        return false;
      }
    }
    
    guesses.push([colIndex, rowIndex]);

    if(grid[colIndex][rowIndex] != '') {
      this.audioService.playShot();
    }
    else{
      this.audioService.playWater();
    }
    return true;
  }


  //
  computerTurn(){
    let colIndex: number, rowIndex: number;
    do {
      colIndex = Math.floor(Math.random() * this.playerGrid.length);
      rowIndex = Math.floor(Math.random() * this.playerGrid[0].length);

    } while (!this.shoot(colIndex, rowIndex, this.playerGrid, this.computerGuesses));
    
    if(this.playerGrid[colIndex][rowIndex] != '') {
      this.audioService.playShot();
    }
    else{
      this.audioService.playWater();
    }
  }

  
  checkShips(ships: Ship[], guesses: number[][]): boolean {
    for (let ship of ships) {
      ship.isSunk = true;
  
      for (let shipIndex = 0; shipIndex < ship.size; shipIndex++) {
        let col = ship.vertical ? ship.colCoordinate + shipIndex: ship.colCoordinate;
        let row = ship.vertical ? ship.rowCoordinate : ship.rowCoordinate + shipIndex;
  
        let hit = guesses.some(g => g[0] === col && g[1] === row);
  
        if (!hit) {
          ship.isSunk = false;
          break;
        }
      }
  
      if (ship.isSunk) {
        console.log(ship);
      }
    }
    return true;
  }
  
  getShipsLeft(ships: Ship[]): number {
    let shipsLeft = 0;
    for (let ship of ships) {
      if (!ship.isSunk) {
        shipsLeft++;
      }
    }
    return shipsLeft;
  }
}
