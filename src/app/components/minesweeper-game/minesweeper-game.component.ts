import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { MineSweeperBlock } from '../../interfaces/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-minesweeper-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './minesweeper-game.component.html',
  styleUrl: './minesweeper-game.component.scss'
})
export class MinesweeperGameComponent implements OnInit {
  mineSweeperGrid: MineSweeperBlock[][] = [];
  availableFlags: number = 0;
  usedFlags: number = 0;
  inGame: boolean = false;

  constructor(private gameService: GameService) { }


  //
  ngOnInit(): void {
    this.startGame();
  }


  //
  async startGame() {
    this.mineSweeperGrid = [];
    this.usedFlags = 0;
    this.inGame = true;
    
    let difficulty: any = await this.getDifficulty();

    this.mineSweeperGrid = this.gameService.generateMineSweeperGrid(difficulty.row, difficulty.col, difficulty.bombs);
    this.availableFlags = difficulty.bombs | 0;
  }


  //
  getDifficulty() {
    let difficulty = this.gameService.requestDifficulty(['Easy', 'Medium', 'Hard', 'Extreme']);
    return difficulty.then((result: any) => {
      switch (result) {
        case 0:
          return { bombs: 10, row: 10, col: 10 };
        case 1:
          return { bombs: 20, row: 14, col: 14 };
        case 2:
          return { bombs: 40, row: 16, col: 16 };
          case 3:
          return { bombs: 70, row: 25, col: 16 };
        default:
          return { bombs: 10, row: 10, col: 10 };
      }
    }
    );
  }


  //
  getBlockValue(col: number, row: number) {
    let block = this.mineSweeperGrid[col][row];
    let minesCount = 0;
    if (block.isMine) return -1;

    for (let i = col - 1; i <= col + 1; i++) {
      for (let j = row - 1; j <= row + 1; j++) {
        if (i < 0 || i >= this.mineSweeperGrid.length || j < 0 || j >= this.mineSweeperGrid[0].length) continue;
        if (this.mineSweeperGrid[i][j].isMine) minesCount++;
      }
    }

    return minesCount;
  }


  //
  propagate(col: number = 0, row: number = 0) {
    for (let i = col - 1; i <= col + 1; i++) {
      for (let j = row - 1; j <= row + 1; j++) {
        if (i < 0 || i >= this.mineSweeperGrid.length || j < 0 || j >= this.mineSweeperGrid[0].length) continue;
        if (this.getBlockValue(i, j) === 0 && !this.mineSweeperGrid[i][j].isRevealed) {
          this.revealBlock(i, j);
          this.propagate(i, j);
        }
        else if (!this.mineSweeperGrid[i][j].isRevealed) {
          this.revealBlock(i, j);
        }
      }
    }
  }


  //
  checkWin() {
    for (let i = 0; i < this.mineSweeperGrid.length; i++) {
      for (let j = 0; j < this.mineSweeperGrid[i].length; j++) {
        if (!this.mineSweeperGrid[i][j].isRevealed && !this.mineSweeperGrid[i][j].isMine) {
          return false;
        };
      }
    }
    return true;
  }


  //
  revealBlock(col: number, row: number) {
    let block = this.mineSweeperGrid[col][row];

    if (block.isRevealed || block.isFlagged || !this.inGame) return;

    block.isRevealed = true;
    if (block.isMine) {
      this.gameService.sendAlert('Perdiste!', 'Perdiste la partida! 😢', 'error');
      this.inGame = false;
      this.revealMines();
    }
    else if (this.getBlockValue(col, row) === 0) {
      this.propagate(col, row);
    }

    if (this.checkWin()) {
      this.gameService.sendAlert('Felicidades!', 'Ganaste la partida! 💣', 'success');
      this.inGame = false;
    }
  }


  //
  revealMines() {
    for (let i = 0; i < this.mineSweeperGrid.length; i++) {
      for (let j = 0; j < this.mineSweeperGrid[i].length; j++) {
        if (this.mineSweeperGrid[i][j].isMine) {
          this.mineSweeperGrid[i][j].isRevealed = true;
        }
      }
    }
  }


  //
  flagBlock(block: MineSweeperBlock, event: any) {
    event.preventDefault();
    if (block.isRevealed || !this.inGame) return;

    if (!block.isFlagged && this.usedFlags < this.availableFlags) {
      block.isFlagged = true;
      this.usedFlags++;
    }
    else if (block.isFlagged) {
      block.isFlagged = false;
      this.usedFlags--;
    }
  }


  //
  getBlockClass(col: number, row: number) {
    let block = this.mineSweeperGrid[col][row];

    if (block.isFlagged) return 'bi-flag text-warning';
    else if (!block.isRevealed) return 'bi-square-fill';
    else if (block.isMine) return 'bi-asterisk card-orange';

    switch (this.getBlockValue(col, row)) {
      case 1: return 'bi-1-square text-primary';
      case 2: return 'bi-2-square text-success';
      case 3: return 'bi-3-square text-danger';
      case 4: return 'bi-4-square text-danger';
      case 5: return 'bi-5-square text-danger';
      case 6: return 'bi-6-square text-danger';
      case 7: return 'bi-7-square text-danger';
      case 8: return 'bi-8-square text-danger';
      default: return 'bi-square text-secondary';
    }
  }
}
