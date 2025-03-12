import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-username-button',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './username-button.component.html',
  styleUrl: './username-button.component.css'
})
export class UsernameButtonComponent {
  changeUsername: boolean = false;
  form: FormGroup;
  buttonHover: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService
  ){
    this.form = this.fb.group({
      username: new FormControl(userService.getUsername(), [])
    });
  }

  updateUsername() {
    if(this.form.value.username){
      this.userService.setUsername(this.form.value.username);
      console.log(this.form.value.username);
      
    }
    this.changeUsername = false;
  }
}
