import { Routes } from '@angular/router';
import { ConfigMenuComponent } from './components/config-menu/config-menu.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        children: [
            {
                path: '',
                redirectTo: 'games-menu',
                pathMatch: 'full'
            },
            {
                path: 'games-menu',
                loadComponent:() => import('./components/games-menu/games-menu.component').then(m => m.GamesMenuComponent)
            },
            {
                path: 'blackjack',
                loadComponent:() => import('./components/blackjack-game/blackjack-game.component').then(m => m.BlackjackGameComponent)
            },
            {
                path: 'solitary',
                loadComponent:() => import('./components/solitary-game/solitary-game.component').then(m => m.SolitaryGameComponent)
            },
            {
                path: 'memory',
                loadComponent:() => import('./components/memory-game/memory-game.component').then(m => m.MemoryGameComponent)
            },
            {
                path: 'chess',
                loadComponent:() => import('./components/chess-game/chess-game.component').then(m => m.ChessGameComponent)
            },
            {
                path: 'sudoku',
                loadComponent:() => import('./components/sudoku-game/sudoku-game.component').then(m => m.SudokuGameComponent)
            },
            {
                path: 'minesweeper',
                loadComponent:() => import('./components/minesweeper-game/minesweeper-game.component').then(m => m.MinesweeperGameComponent)
            },
            {
                path: 'hangman',
                loadComponent:() => import('./components/hangman-game/hangman-game.component').then(m => m.HangmanGameComponent)
            },
            {
                path: 'wordle',
                loadComponent:() => import('./components/wordle-game/wordle-game.component').then(m => m.WordleGameComponent)
            },
            {
                path: 'generala',
                loadComponent:() => import('./components/generala-game/generala-game.component').then(m => m.GeneralaGameComponent)
            },
            {
                path: 'tictactoe',
                loadComponent:() => import('./components/tictactoeoe-game/tictactoeoe-game.component').then(m => m.TictactoeoeGameComponent)
            },
            {
                path: 'crosswords',
                loadComponent:() => import('./components/crosswords-game/crosswords-game.component').then(m => m.CrosswordsGameComponent)
            },
            {
                path: 'battleship',
                loadComponent:() => import('./components/battleship-game/battleship-game.component').then(m => m.BattleshipGameComponent)
            },
            {
                path: 'fourinline',
                loadComponent:() => import('./components/fourinline-game/fourinline-game.component').then(m => m.FourinlineGameComponent)
            }
        ]
        
    },
    {
        path: 'config-menu',
        component: ConfigMenuComponent
    }
];
