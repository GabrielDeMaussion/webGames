import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-tictactoeoe-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tictactoeoe-game.component.html',
  styleUrl: './tictactoeoe-game.component.scss'
})
export class TictactoeoeGameComponent implements OnInit {
  tictactoeGrid: string[][] = [];

  playerIcon: string = '';
  computerIcon: string = '';
  playersTurn: boolean = false;
  inGame: boolean = false;

  
  //
  constructor(private readonly gameService: GameService) { }


  //
  ngOnInit(): void {
    this.startGame()
  }

  
  //
  startGame() {
    this.tictactoeGrid = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
    this.inGame = true
    let playerStart = Math.random() < 0.5
    this.playerIcon = playerStart ? 'X' : 'O'
    this.computerIcon = playerStart ? 'O' : 'X'
    if (playerStart) {
      this.playersTurn = true
    }
    else {
      this.playersTurn = false
      this.computersTurn()
    }


  }


  //
  getBorder(row: number, col: number) {
    return {
      'border-top': row === 0 ? false : true,
      'border-start': col === 0 ? false : true,
      'border-end': col === 2 ? false : true,
      'border-bottom': row === 2 ? false : true,
    }
  }


  //
  getIcon(cell: string) {
    return cell != '' ? (cell === 'X' ? 'bi-x-lg text-primary' : 'bi-circle text-danger') : ''
  }


  async clickCell(row: number, col: number) {    
    
    if (!this.inGame || !this.playersTurn || this.tictactoeGrid[col][row]) {
      return
    }

    this.tictactoeGrid[col][row] = this.playerIcon
    if (this.checkWin(this.playerIcon)) {
      await this.gameService.setDelay(300);
      this.gameService.sendAlert('Ganaste!', '¡Felicidades! Has ganado el juego.', 'success');
      this.inGame = false;
      return;
    }

    this.playersTurn = false
    this.computersTurn();
  }


  //
  checkWin(icon: string) {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (this.tictactoeGrid[i][0] === icon && this.tictactoeGrid[i][1] === icon && this.tictactoeGrid[i][2] === icon) {
        return true;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (this.tictactoeGrid[0][i] === icon && this.tictactoeGrid[1][i] === icon && this.tictactoeGrid[2][i] === icon) {
        return true;
      }
    }

    // Check diagonals
    if (this.tictactoeGrid[0][0] === icon && this.tictactoeGrid[1][1] === icon && this.tictactoeGrid[2][2] === icon) {
      return true;
    }

    if (this.tictactoeGrid[0][2] === icon && this.tictactoeGrid[1][1] === icon && this.tictactoeGrid[2][0] === icon) {
      return true;
    }
    
    // Check for draw
    if (this.tictactoeGrid.flat().every(cell => cell !== '')) {
      this.gameService.sendAlert('Empate', 'No hay más movimientos posibles.', 'warning');
      this.inGame = false;
      return true;
    }

    return false;
  }


  //
  async computersTurn() {
    let emptyCells = this.tictactoeGrid.flatMap((row, rowIndex) => {
      return row.map((cell, colIndex) => {
        return cell === '' ? { row: rowIndex, col: colIndex } : null
      })
    }).filter(cell => cell !== null)

    if (emptyCells.length > 0) {
      let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

      await this.gameService.setDelay(300);
      this.tictactoeGrid[randomCell.row][randomCell.col] = this.computerIcon
      if (this.checkWin(this.computerIcon)) {
        this.gameService.sendAlert('Perdiste', 'Skill Issue...', 'error');
        this.inGame = false;
      }
    }

    this.playersTurn = true;
  }


}
