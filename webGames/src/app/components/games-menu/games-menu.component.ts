import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameService } from '../../services/game.service';
import { GameCard } from '../../interfaces/models';

@Component({
  selector: 'app-games-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './games-menu.component.html',
  styleUrl: './games-menu.component.scss'
})
export class GamesMenuComponent implements OnInit{
  gameCards : GameCard[] = [];

  constructor(private readonly gameService : GameService) { }

  ngOnInit(): void {
      this.gameCards = this.gameService.getGameCards();
  }

  getToolTip(game: GameCard): string {
    return game.description.slice(0, 62) + '...';
  }
}
