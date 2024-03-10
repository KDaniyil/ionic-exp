import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
})
export class HeaderComponent implements AfterViewInit {
  showMenu: boolean = false;
  private observer?: IntersectionObserver;
  isVisibleInView: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  isAgency: boolean = false;
  user: any;

  constructor(
    public router: Router,
    private el: ElementRef,
    private appService: AppService
  ) {}

  ngAfterViewInit() {
    // check login agency

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === true) {
          this.isVisibleInView.next(false);
        } else {
          this.isVisibleInView.next(true);
        }
      },
      {
        threshold: 0.75,
      }
    );

    this.observer.observe(this.el.nativeElement as HTMLElement);
  }
}
