import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css'],
})
export class ScrollToTopComponent {
  scrollToTopVisible = false;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    this.scrollToTopVisible = document.documentElement.scrollTop > 100;
  }
}
