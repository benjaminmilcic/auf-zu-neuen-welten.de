import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateSendButtonService } from '../shared/translate-send-button.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  sidebarActivated: boolean = false;

  language: 'de' | 'en' = 'en';

  constructor(
    private translate: TranslateService,
    private translateSendButtonService: TranslateSendButtonService
  ) {}

  onToggleSidebar(event: Event | null) {
    if (event) {
      event.preventDefault();
    }

    this.sidebarActivated = !this.sidebarActivated;

    // this is necessary because ngClass does not work with FontAwesome CSS Libary
    // Next time better use FontAwesome Angular Package
    const menuClosed = document.body.querySelector('.fa-bars');
    const menuOpen = document.body.querySelector('.fa-xmark');
    if (menuClosed) {
      menuClosed.classList.remove('fa-bars');
      menuClosed.classList.add('fa-xmark');
    }
    if (menuOpen) {
      menuOpen.classList.remove('fa-xmark');
      menuOpen.classList.add('fa-bars');
    }
  }

  onClick() {
    this.onToggleSidebar(null);
  }

  toggleLanguage() {
    this.language = this.language === 'en' ? 'de' : 'en';
    this.translate.use(this.language);
    this.translateSendButtonService.translateSendButton.next();
  }
}
