import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsernameButtonComponent } from "../assets/username-button/username-button.component";
import { AudioService } from '../../services/audio.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, UsernameButtonComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  muteMusic: boolean = false;

  constructor(
    private readonly audioService: AudioService
  ) { }
  
  ngOnInit(): void {
    this.playBackgroundMusic();
  }

  playBackgroundMusic() {
    this.audioService.playMusic("backgroundMusic1.mp3");
  }

  toggleMusic() {
    this.audioService.toggleMusic();
    this.muteMusic = !this.muteMusic;
  }
}
