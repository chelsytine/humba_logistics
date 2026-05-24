import { Injectable } from '@angular/core';
import type { Truck } from '../shared/truck-card/truck-card';
import { environment } from '../../environments/environment';

export interface FirestoreTruck extends Omit<Truck, 'id'> {
  order: number;
}

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private initialized = false;
  private db: any = null;
  private ready: Promise<void>;

  constructor() {
    const config = environment.firebase;
    if (config.apiKey && config.apiKey !== 'YOUR_API_KEY') {
      this.ready = this.initFirebase();
    } else {
      this.ready = Promise.resolve();
    }
  }

  private async initFirebase(): Promise<void> {
    try {
      const { initializeApp } = await import('firebase/app');
      const { getFirestore } = await import('firebase/firestore');
      const app = initializeApp(environment.firebase);
      this.db = getFirestore(app);
      this.initialized = true;
    } catch (e) {
      console.error('Firebase init failed:', e);
      this.initialized = false;
    }
  }

  private async ensureReady(): Promise<void> {
    await this.ready;
  }

  get isInitialized(): boolean {
    return this.initialized;
  }

  async getAllTrucks(): Promise<FirestoreTruck[]> {
    if (!this.initialized || !this.db) return this.defaultTrucks();
    try {
      const { getDocs, collection } = await import('firebase/firestore');
      const snapshot = await getDocs(collection(this.db, 'trucks'));
      if (snapshot.empty) {
        await this.seedDefaults();
        return this.defaultTrucks();
      }
      const trucks: FirestoreTruck[] = [];
      snapshot.forEach((doc: any) => trucks.push(doc.data() as FirestoreTruck));
      return trucks.sort((a, b) => a.order - b.order);
    } catch {
      return this.defaultTrucks();
    }
  }

  async saveTruck(id: string, truck: FirestoreTruck): Promise<void> {
    if (!this.initialized || !this.db) return;
    try {
      const { setDoc, doc } = await import('firebase/firestore');
      await setDoc(doc(this.db, 'trucks', id), truck);
    } catch (e) { console.error('saveTruck failed:', e); }
  }

  async deleteTruck(id: string): Promise<void> {
    if (!this.initialized || !this.db) return;
    try {
      const { deleteDoc, doc } = await import('firebase/firestore');
      await deleteDoc(doc(this.db, 'trucks', id));
    } catch (e) { console.error('deleteTruck failed:', e); }
  }

  async sendMessage(msg: any): Promise<void> {
    await this.ensureReady();
    if (!this.initialized || !this.db) return;
    try {
      const { setDoc, doc } = await import('firebase/firestore');
      await setDoc(doc(this.db, 'messages', msg.id), msg);
    } catch (e) { console.error('sendMessage failed:', e); }
  }

  async getAllMessages(): Promise<any[]> {
    if (!this.initialized || !this.db) return [];
    try {
      const { getDocs, collection } = await import('firebase/firestore');
      const snapshot = await getDocs(collection(this.db, 'messages'));
      const msgs: any[] = [];
      snapshot.forEach((doc: any) => msgs.push({ id: doc.id, ...doc.data() }));
      return msgs.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (e) {
      console.error('getAllMessages failed:', e);
      return [];
    }
  }

  async markMsgRead(id: string): Promise<void> {
    if (!this.initialized || !this.db) return;
    try {
      const { updateDoc, doc } = await import('firebase/firestore');
      await updateDoc(doc(this.db, 'messages', id), { read: true });
    } catch (e) { console.error('markMsgRead failed:', e); }
  }

  async deleteMessage(id: string): Promise<void> {
    if (!this.initialized || !this.db) return;
    try {
      const { deleteDoc, doc } = await import('firebase/firestore');
      await deleteDoc(doc(this.db, 'messages', id));
    } catch (e) { console.error('deleteMessage failed:', e); }
  }

  private async seedDefaults(): Promise<void> {
    try {
      const { setDoc, doc } = await import('firebase/firestore');
      for (const t of this.defaultTrucks()) {
        const id = t.name.toLowerCase().replace(/\s+/g, '-');
        await setDoc(doc(this.db, 'trucks', id), t);
      }
    } catch (e) { console.error('seedDefaults failed:', e); }
  }

  private defaultTrucks(): FirestoreTruck[] {
    return [
      { name: 'Humba LightRunner', type: 'Light Delivery', capacity: '1.5 Tons', dimensions: '3.5m x 1.8m x 1.6m', maxLoad: '1,500 kg', description: 'Compact and agile delivery vehicle perfect for urban deliveries, small goods transport, and quick turnaround jobs in Harare and surrounding areas.', features: ['Local deliveries', 'Parcel transport', 'Small goods', 'Quick dispatch'], image: 'light-runner.jpeg', order: 1 },
      { name: 'Humba Mover X2', type: 'Medium Transport', capacity: '4 Tons', dimensions: '5.5m x 2.2m x 2.0m', maxLoad: '4,000 kg', description: 'Versatile medium-duty truck designed for furniture removals, business distribution, and medium-scale construction material delivery.', features: ['Furniture removals', 'Business distribution', 'Construction materials', 'Intercity transport'], image: 'mover.jpeg', order: 2 },
      { name: 'Humba Titan Cargo', type: 'Heavy Transport', capacity: '10 Tons', dimensions: '7.2m x 2.4m x 2.4m', maxLoad: '10,000 kg', description: 'Heavy-duty transport workhorse built for bulk material logistics, large construction deliveries, and long-haul cargo across Zimbabwe.', features: ['Bulk materials', 'Heavy construction', 'Long-haul transport', 'Cross-border capable'], image: 'titan-cargo.jpeg', order: 3 },
      { name: 'Humba FlatMaster', type: 'Flatbed / Construction', capacity: '8 Tons', dimensions: '6.5m x 2.4m (open deck)', maxLoad: '8,000 kg', description: 'Open-deck flatbed for construction materials - sand, bricks, cement, and aggregates.', features: ['Sand & aggregates', 'Brick delivery', 'Cement transport', 'Site logistics'], image: 'flatmaster.jpeg', order: 4 },
      { name: 'Humba ChillTrans', type: 'Refrigerated Transport', capacity: '3 Tons', dimensions: '4.8m x 2.1m x 2.0m', maxLoad: '3,000 kg', description: 'Temperature-controlled transport for perishable goods, food products, and sensitive cargo.', features: ['Perishable goods', 'Food transport', 'Temperature controlled', 'Sealed cargo'], image: 'chilltrans.jpeg', order: 5 },
      { name: 'Humba SwiftVan', type: 'Small Van', capacity: '800 kg', dimensions: '2.8m x 1.5m x 1.4m', maxLoad: '800 kg', description: 'Compact van for express deliveries, small moves, and quick transport needs.', features: ['Express delivery', 'Small moves', 'Same-day service', 'City logistics'], image: 'swift.jpeg', order: 6 },
      { name: 'Humba Airport Shuttle', type: 'Airport Taxi', capacity: '4 Passengers', dimensions: '4.2m x 1.7m x 1.5m', maxLoad: '4 passengers + luggage', description: 'Comfortable and reliable airport transfer service across Harare.', features: ['Airport transfers', 'Hotel pickups', 'Meet & greet', 'Flight tracking'], image: 'airpor.jpeg', order: 7 }
    ];
  }
}
