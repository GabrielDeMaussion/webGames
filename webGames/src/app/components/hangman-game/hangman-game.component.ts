import { Component } from '@angular/core';
import { KeyboardComponent } from '../assets/keyboard/keyboard.component';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-hangman-game',
  standalone: true,
  imports: [KeyboardComponent],
  templateUrl: './hangman-game.component.html',
  styleUrl: './hangman-game.component.scss'
})
export class HangmanGameComponent {
  correctLetters: string[] = [];
  wrongLetters: string[] = [];
  hiddenWord: string = '';
  guessedLetters: string[] = [];

  constructor(private gameService : GameService){}
}
