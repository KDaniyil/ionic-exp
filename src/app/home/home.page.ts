import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { HeaderComponent } from '../shared/components/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    RouterLink,
    HeaderComponent,
  ],
})
export class HomePage implements AfterViewInit {
  videoList: string[] = [
    'https://www.studiovatore.it/tenerife-experience/video/placeholder_video_home.mp4',
    'https://www.studiovatore.it/tenerife-experience/video/tenerife2.mp4',
    'https://www.studiovatore.it/tenerife-experience/video/tenerife3.mp4',
    'https://www.studiovatore.it/tenerife-experience/video/tenerife4.mp4',
    'https://www.studiovatore.it/tenerife-experience/video/tenerife5.mp4',
  ];

  imagesPoster: string[] = [
    'assets/img/poster_video/poster_tenerife_home.jpg',
    'assets/img/poster_video/poster_tenerife_2.jpg',
    'assets/img/poster_video/poster_tenerife_3.jpg',
    'assets/img/poster_video/poster_tenerife_4.jpg',
    'assets/img/poster_video/poster_tenerife_5.jpg',
  ];

  @ViewChild('videoElement') videoElements!: ElementRef<HTMLVideoElement>;

  currentVideoIndex!: number;
  activeVideo!: string;

  constructor() {}
  ngAfterViewInit(): void {
    this.currentVideoIndex = 0;
    this.playVideo();
  }

  playVideo(): void {
    const video = this.videoElements.nativeElement;
    video.src = this.videoList[this.currentVideoIndex];
    video.poster = this.imagesPoster[this.currentVideoIndex];
    video.muted = true;
    video.play();
    video.onended = () => this.playNextVideo();
  }

  playNextVideo(): void {
    this.currentVideoIndex =
      this.currentVideoIndex + 1 < this.videoList.length
        ? this.currentVideoIndex + 1
        : 0;
    this.playVideo();
  }
}
