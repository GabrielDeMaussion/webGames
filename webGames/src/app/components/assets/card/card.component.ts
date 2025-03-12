import { Component, Input } from '@angular/core';
import { StorageService } from '../../../services/storage.service';
import { CommonModule } from '@angular/common';
import { Card, Preferences } from '../../../interfaces/models';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  //Inputs
  @Input() card!: Card;
  @Input() cardSize: string = 'medium';
  @Input() clickeable: boolean = false;

  borderColor: string = '';
  selectedBack: string = "Waves.png";

  constructor(
    private readonly storageService: StorageService,
    private readonly userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.getCardBack();
  }

  //------------------------------------Metodos------------------------------------//
  getNumber(): number {
    return this.card.value;
  }

  getCardBack() {
    let username = this.userService.getUsername();
    let savedPreferences = this.storageService.getPreferences(username) as Preferences;    

    this.selectedBack = savedPreferences.cardBack;
  }

  getIcon(): string {
    return 'bi-suit-' + this.card.suit + '-fill'
  }

  getSVG(): string {
    switch (this.card.suit) {
      case 'heart':
        return 'M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314';
      case 'diamond':
        return 'M2.45 7.4 7.2 1.067a1 1 0 0 1 1.6 0L13.55 7.4a1 1 0 0 1 0 1.2L8.8 14.933a1 1 0 0 1-1.6 0L2.45 8.6a1 1 0 0 1 0-1.2';
      case 'club':
        return 'M11.5 12.5a3.5 3.5 0 0 1-2.684-1.254 20 20 0 0 0 1.582 2.907c.231.35-.02.847-.438.847H6.04c-.419 0-.67-.497-.438-.847a20 20 0 0 0 1.582-2.907 3.5 3.5 0 1 1-2.538-5.743 3.5 3.5 0 1 1 6.708 0A3.5 3.5 0 1 1 11.5 12.5';
      case 'spade':
        return 'M7.184 11.246A3.5 3.5 0 0 1 1 9c0-1.602 1.14-2.633 2.66-4.008C4.986 3.792 6.602 2.33 8 0c1.398 2.33 3.014 3.792 4.34 4.992C13.86 6.367 15 7.398 15 9a3.5 3.5 0 0 1-6.184 2.246 20 20 0 0 0 1.582 2.907c.231.35-.02.847-.438.847H6.04c-.419 0-.67-.497-.438-.847a20 20 0 0 0 1.582-2.907';
      default:
        return '';
    }
  }

  getColor() {
    return 'card-'+this.card.color;
  }

}
