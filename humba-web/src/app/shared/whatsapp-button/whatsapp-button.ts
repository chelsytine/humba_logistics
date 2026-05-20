import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-whatsapp-button',
  imports: [],
  templateUrl: './whatsapp-button.html',
  styleUrl: './whatsapp-button.css'
})
export class WhatsAppButton {
  phoneNumber = environment.whatsappNumber;
  message = encodeURIComponent('Hello Humba Logistics! I would like to inquire about your services.');
  whatsappUrl = `https://wa.me/${this.phoneNumber}?text=${this.message}`;
}
