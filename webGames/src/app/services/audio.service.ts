import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { UserService } from './user.service';
import { Preferences } from '../interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  cardFlipAudios: string[] = [
    "flipCard1.mp3",
    "flipCard2.mp3",
    "flipCard3.mp3",
  ]

  cardDealAudios: string[] = [
    "dealCard1.mp3",
    "dealCard2.mp3",
  ]

  constructor(
    private readonly storageService: StorageService,
    private readonly userService: UserService
  ) { }

  playAudio(audioName: string, volume: number = -1) {
    let defaultVolume = (this.storageService.getPreferences(this.userService.getUsername()) as Preferences).volume

    const audioElement = new Audio('audios/'+audioName);
    audioElement.volume = (volume != -1) ? volume : defaultVolume;
    audioElement.play();
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
