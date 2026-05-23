import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface Truck {
  id: string;
  name: string;
  type: string;
  capacity: string;
  dimensions: string;
  maxLoad: string;
  description: string;
  features: string[];
  image: string;
  category?: string;
}

@Component({
  selector: 'app-truck-card',
  imports: [],
  templateUrl: './truck-card.html',
  styleUrl: './truck-card.css'
})
export class TruckCard {
  @Input({ required: true }) truck!: Truck;

  get whatsappUrl(): string {
    const msg = encodeURIComponent(`Hi! I'm interested in the ${this.truck.name} (${this.truck.type}). Can you share more details?`);
    return `https://wa.me/${environment.whatsappNumber}?text=${msg}`;
  }
}
