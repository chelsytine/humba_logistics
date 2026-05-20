import { Component } from '@angular/core';
import { TruckCard, type Truck } from '../../shared/truck-card/truck-card';
import { Appear } from '../../shared/appear';

@Component({
  selector: 'app-fleet',
  imports: [TruckCard, Appear],
  templateUrl: './fleet.html',
  styleUrl: './fleet.css'
})
export class Fleet {
  trucks: Truck[] = [
    {
      id: 'light-delivery',
      name: 'Humba LightRunner',
      type: 'Light Delivery',
      capacity: '1.5 Tons',
      dimensions: '3.5m x 1.8m x 1.6m',
      maxLoad: '1,500 kg',
      description: 'Compact and agile delivery vehicle perfect for urban deliveries, small goods transport, and quick turnaround jobs in Harare and surrounding areas.',
      features: ['Local deliveries', 'Parcel transport', 'Small goods', 'Quick dispatch'],
      image: 'lightRunner.png'
    },
    {
      id: 'medium-transport',
      name: 'Humba Mover X2',
      type: 'Medium Transport',
      capacity: '4 Tons',
      dimensions: '5.5m x 2.2m x 2.0m',
      maxLoad: '4,000 kg',
      description: 'Versatile medium-duty truck designed for furniture removals, business distribution, and medium-scale construction material delivery.',
      features: ['Furniture removals', 'Business distribution', 'Construction materials', 'Intercity transport'],
      image: 'mover.png'
    },
    {
      id: 'heavy-hauler',
      name: 'Humba Titan Cargo',
      type: 'Heavy Transport',
      capacity: '10 Tons',
      dimensions: '7.2m x 2.4m x 2.4m',
      maxLoad: '10,000 kg',
      description: 'Heavy-duty transport workhorse built for bulk material logistics, large construction deliveries, and long-haul cargo across Zimbabwe.',
      features: ['Bulk materials', 'Heavy construction', 'Long-haul transport', 'Cross-border capable'],
      image: 'titan cargo.png'
    },
    {
      id: 'flatbed',
      name: 'Humba FlatMaster',
      type: 'Flatbed / Construction',
      capacity: '8 Tons',
      dimensions: '6.5m x 2.4m (open deck)',
      maxLoad: '8,000 kg',
      description: 'Open-deck flatbed for construction materials - sand, bricks, cement, and aggregates. Easy loading and unloading for site operations.',
      features: ['Sand & aggregates', 'Brick delivery', 'Cement transport', 'Site logistics'],
      image: 'flatmaster.png'
    },
    {
      id: 'refrigerated',
      name: 'Humba ChillTrans',
      type: 'Refrigerated Transport',
      capacity: '3 Tons',
      dimensions: '4.8m x 2.1m x 2.0m',
      maxLoad: '3,000 kg',
      description: 'Temperature-controlled transport for perishable goods, food products, and sensitive cargo requiring climate-controlled conditions.',
      features: ['Perishable goods', 'Food transport', 'Temperature controlled', 'Sealed cargo'],
      image: 'chills.png'
    },
    {
      id: 'small-van',
      name: 'Humba SwiftVan',
      type: 'Small Van',
      capacity: '800 kg',
      dimensions: '2.8m x 1.5m x 1.4m',
      maxLoad: '800 kg',
      description: 'Compact van for express deliveries, small moves, and quick transport needs. Ideal for same-day delivery services within the city.',
      features: ['Express delivery', 'Small moves', 'Same-day service', 'City logistics'],
      image: 'swift.png'
    }
  ];
}
