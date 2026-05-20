import { Component, OnInit, signal } from '@angular/core';
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
  trucks = signal<Truck[]>(this.defaultTrucks());

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
      image: t.image
    }));
    this.trucks.set(mapped);
  }

  private defaultTrucks(): Truck[] {
    return [
      { id: 'light-delivery', name: 'Humba LightRunner', type: 'Light Delivery', capacity: '1.5 Tons', dimensions: '3.5m x 1.8m x 1.6m', maxLoad: '1,500 kg', description: 'Compact and agile delivery vehicle perfect for urban deliveries, small goods transport, and quick turnaround jobs in Harare.', features: ['Local deliveries', 'Parcel transport', 'Small goods', 'Quick dispatch'], image: 'light runner.jpeg' },
      { id: 'medium-transport', name: 'Humba Mover X2', type: 'Medium Transport', capacity: '4 Tons', dimensions: '5.5m x 2.2m x 2.0m', maxLoad: '4,000 kg', description: 'Versatile medium-duty truck designed for furniture removals, business distribution, and medium-scale construction material delivery.', features: ['Furniture removals', 'Business distribution', 'Construction materials', 'Intercity transport'], image: 'mover.jpeg' },
      { id: 'heavy-hauler', name: 'Humba Titan Cargo', type: 'Heavy Transport', capacity: '10 Tons', dimensions: '7.2m x 2.4m x 2.4m', maxLoad: '10,000 kg', description: 'Heavy-duty transport workhorse built for bulk material logistics, large construction deliveries, and long-haul cargo across Zimbabwe.', features: ['Bulk materials', 'Heavy construction', 'Long-haul transport', 'Cross-border capable'], image: 'titan cargo.jpeg' },
      { id: 'flatbed', name: 'Humba FlatMaster', type: 'Flatbed / Construction', capacity: '8 Tons', dimensions: '6.5m x 2.4m (open deck)', maxLoad: '8,000 kg', description: 'Open-deck flatbed for construction materials.', features: ['Sand & aggregates', 'Brick delivery', 'Cement transport', 'Site logistics'], image: 'flatmaster.jpeg' },
      { id: 'refrigerated', name: 'Humba ChillTrans', type: 'Refrigerated Transport', capacity: '3 Tons', dimensions: '4.8m x 2.1m x 2.0m', maxLoad: '3,000 kg', description: 'Temperature-controlled transport for perishable goods.', features: ['Perishable goods', 'Food transport', 'Temperature controlled', 'Sealed cargo'], image: 'chilltrans.jpeg' },
      { id: 'small-van', name: 'Humba SwiftVan', type: 'Small Van', capacity: '800 kg', dimensions: '2.8m x 1.5m x 1.4m', maxLoad: '800 kg', description: 'Compact van for express deliveries and quick transport needs.', features: ['Express delivery', 'Small moves', 'Same-day service', 'City logistics'], image: 'swift.jpeg' },
      { id: 'airport-taxi', name: 'Humba Airport Shuttle', type: 'Airport Taxi', capacity: '4 Passengers', dimensions: '4.2m x 1.7m x 1.5m', maxLoad: '4 passengers + luggage', description: 'Comfortable and reliable airport transfer service across Harare.', features: ['Airport transfers', 'Hotel pickups', 'Meet & greet', 'Flight tracking'], image: 'airpor.jpeg' }
    ];
  }
}
