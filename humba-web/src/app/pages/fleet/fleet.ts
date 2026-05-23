import { Component, OnInit, signal, computed } from '@angular/core';
import { TruckCard, type Truck } from '../../shared/truck-card/truck-card';
import { Appear } from '../../shared/appear';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-fleet',
  imports: [TruckCard, Appear],
  templateUrl: './fleet.html',
  styleUrl: './fleet.css'
})
export class Fleet implements OnInit {
  allTrucks = signal<Truck[]>([]);
  activeFilter = signal<string>('all');

  trucks = computed(() => {
    const filter = this.activeFilter();
    const all = this.allTrucks();
    if (filter === 'all') return all;
    return all.filter(t => t.category === filter);
  });

  constructor(private fb: FirebaseService) {}

  async ngOnInit(): Promise<void> {
    const data = await this.fb.getAllTrucks();
    const mapped: Truck[] = data.map(t => ({
      id: t.name.toLowerCase().replace(/\s+/g, '-'),
      name: t.name,
      type: t.type,
      capacity: t.capacity,
      dimensions: t.dimensions,
      maxLoad: t.maxLoad,
      description: t.description,
      features: t.features,
      image: t.image,
      category: t.type.includes('Construction') || t.type.includes('Flatbed') ? 'construction' : t.type.includes('Taxi') || t.type.includes('Van') || t.type.includes('Shuttle') ? 'passenger' : 'transport'
    }));
    this.allTrucks.set(mapped);
  }

  setFilter(cat: string): void {
    this.activeFilter.set(cat);
  }
}
