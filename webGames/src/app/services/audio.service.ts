import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { UserService } from './user.service';
import { Preferences } from '../interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  //Atributos
  backgroundMusic: HTMLAudioElement = new Audio();


  //Listado de audios
  cardFlipAudios: string[] = [
    "flipCard1.mp3",
    "flipCard2.mp3",
    "flipCard3.mp3",
  ]

  cardDealAudios: string[] = [
    "dealCard1.mp3",
    "dealCard2.mp3",
  ]

  backgroundMusics: string[] = [
    "backgroundMusic1.mp3",
    "backgroundMusic2.mp3",
    "backgroundMusic3.mp3",
    "backgroundMusic4.mp3",
  ]

  constructor(
    private readonly storageService: StorageService,
    private readonly userService: UserService
  ) { }


  //
  playAudio(audioName: string, volume: number = -1) {
    let defaultVolume = (this.storageService.getPreferences(this.userService.getUsername()) as Preferences).effectsVolume

    const audioElement = new Audio('audios/' + audioName);
    audioElement.volume = (volume != -1) ? volume : defaultVolume;
    audioElement.play();
  }


  //
  playMusic(audioName: string, volume: number = -1) {
    if (!this.backgroundMusic.paused) {
      return;
    }

    let defaultVolume = (this.storageService.getPreferences(this.userService.getUsername()) as Preferences).musicVolume
    this.backgroundMusic.loop = true;
    this.backgroundMusic.src = 'audios/' + audioName;
    this.backgroundMusic.volume = (volume != -1) ? volume : defaultVolume;
    this.backgroundMusic.play();
  }
  
  
  //
  updateMusic(volume: number, backgroundMusic: string = '') {
    if(backgroundMusic != ''){
      this.backgroundMusic.src = 'audios/' + backgroundMusic;
    }
    this.backgroundMusic.volume = volume;
  }


  //
  toggleMusic() {
    if (!this.backgroundMusic.paused) {
      this.backgroundMusic.pause();
    } else {
      this.playMusic(this.backgroundMusics[0]);
    }
  }

  playCardFlipRandom() {
    let randomIndex = Math.floor(Math.random() * this.cardFlipAudios.length);
    this.playAudio(this.cardFlipAudios[randomIndex]);
  }

  playCardDealRandom() {
    let randomIndex = Math.floor(Math.random() * this.cardDealAudios.length);
    this.playAudio(this.cardDealAudios[randomIndex]);
  }

  playDeckShuffle() {
    this.playAudio("dealDeck1.mp3");
  }

  playVictoy() {
    this.playAudio("victory.mp3");
  }

  playSuccess() {
    this.playAudio("success.mp3");
  }

}
