import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dice.component.html',
  styleUrl: './dice.component.scss'
})
export class DiceComponent {
  @Input() value: number = 0;
  @Input() selected: boolean = false;
  @Output() valueChange = new EventEmitter<number>();
  @Output() selectedChange = new EventEmitter<boolean>();

  rollDice() {
    this.value = Math.floor(Math.random() * 6) + 1;
    this.selected = false;
    
    this.valueChange.emit(this.value);
    this.selectedChange.emit(this.selected);
  }
}
