import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.scss'
})
export class KeyboardComponent {
  @Input() word: string = '';
  @Input() hasEnter: boolean = true;
  @Input() redKeys: string[] = [];
  @Input() greenKeys: string[] = [];
  @Output() wordChange = new EventEmitter<string>();
  @Output() enter = new EventEmitter<void>();

  letters: string[] = 'QWERTYUIOP;ASDFGHJKLÑ;ZXCVBNM'.split(';');

  pressKey(key: string = "") {
    if(key) {
      this.word = (this.hasEnter ? this.word += key.toUpperCase() : this.word = key.toUpperCase());
    }
    this.wordChange.emit(this.word.toUpperCase());

    if(!this.hasEnter){
      this.word = '';
    }
  }

  enterKey() {
    this.enter.emit();
  }

  deleteKey() {
    const chars = this.word.split('');
    chars.pop();
    this.word = chars.join('');

    this.pressKey();
  }

  focusInput() {
    document.getElementById('wordInput')!.focus();
  }

  getKeyClass(key: string) {
    if (this.greenKeys.includes(key)) {
      return 'btn-success';
    } else if (this.redKeys.includes(key)) {
      return 'btn-danger';
    }
    return 'btn-outline-secondary';
  }

  isFocused() : boolean{
    return document.activeElement?.id === 'wordInput';
  }
}
