import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { TranslateSendButtonService } from '../shared/translate-send-button.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  isSending = false;

  sendButtonText = '';

  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private translate: TranslateService,
    private translateSendButtonService: TranslateSendButtonService
  ) {}

  ngOnInit(): void {
    this.translateSendButtonService.translateSendButton.subscribe(() => {
      this.translate.get('contact.send').subscribe((res: string) => {
        this.sendButtonText = res;
      });
    });
    this.translateSendButtonService.translateSendButton.next();
  }

  onSubmit(messageForm: NgForm) {
    this.isSending = true;
    this.translate.get('contact.sending').subscribe((res: string) => {
      this.sendButtonText = res;
    });
    this.http
      .post('https://nest-form2mail.adaptable.app/', messageForm.value)
      .subscribe(
        () => {
          this.isSending = false;
          this.translate.get('contact.send').subscribe((res: string) => {
            this.sendButtonText = res;
          });
          messageForm.reset();

          forkJoin(
            this.translate.get('contact.toast.success.text'),
            this.translate.get('contact.toast.success.headline')
          ).subscribe((results) => {
            this.toastr.success(results[0], results[1], {
              positionClass: 'toast-bottom-center',
            });
          });
        },
        (error: Error) => {
          this.isSending = false;
          this.translate.get('contact.send').subscribe((res: string) => {
            this.sendButtonText = res;
          });

          this.translate.get('contact.toast.error').subscribe((res: string) => {
            this.toastr.error(error.message, res, {
              positionClass: 'toast-bottom-center',
            });
          });
        }
      );
  }
}
