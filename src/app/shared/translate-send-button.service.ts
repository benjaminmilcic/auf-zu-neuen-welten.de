import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateSendButtonService {
  translateSendButton = new Subject<void>();

  constructor() {}
}
