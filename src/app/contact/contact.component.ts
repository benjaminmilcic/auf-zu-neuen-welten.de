import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  isSending = false;
  sendButtonText = 'Send';
  constructor(private toastr: ToastrService, private http: HttpClient) {}

  onSubmit(messageForm: NgForm) {
    this.isSending = true;
    this.sendButtonText = 'Sending...';
    this.http
      .post('https://nest-form2mail.adaptable.app/', messageForm.value)
      .subscribe(
        () => {
          this.isSending = false;
          this.sendButtonText = 'Send';
          messageForm.reset();
          this.toastr.success('Your message was sent!', 'All right!', {
            positionClass: 'toast-bottom-center',
          });
        },
        (error: Error) => {
          this.isSending = false;
          this.sendButtonText = 'Send';
          this.toastr.error(
            error.message,
            'An error has occurred, message was not sent!',
            {
              positionClass: 'toast-bottom-center',
            }
          );
        }
      );
  }
}
