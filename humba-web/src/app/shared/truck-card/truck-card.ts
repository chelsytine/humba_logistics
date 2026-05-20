import { Component, Input } from '@angular/core';

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
}

@Component({
  selector: 'app-truck-card',
  imports: [],
  templateUrl: './truck-card.html',
  styleUrl: './truck-card.css'
})
export class TruckCard {
  @Input({ required: true }) truck!: Truck;
}
