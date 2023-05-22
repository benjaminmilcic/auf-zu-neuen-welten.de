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
  constructor(private toastr: ToastrService, private http: HttpClient) {}

  onSubmit(messageForm: NgForm) {
    console.log(messageForm.value);
    this.http
      .post('https://nest-form2mail.adaptable.app/', messageForm.value)
      .subscribe(
        () => {
          messageForm.reset();
          this.toastr.success('Your message was sent!', 'All right!', {
            positionClass: 'toast-bottom-center',
          });
        },
        (error: Error) => {
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
