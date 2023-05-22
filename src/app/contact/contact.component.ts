import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  constructor(private toastr: ToastrService) { }
  
  onSubmit(messageForm: NgForm) {
    console.log(messageForm.value);
    messageForm.reset();
    this.toastr.success('Your message was sent!', 'All right!', {
      positionClass: 'toast-bottom-center',
    });
  }
}