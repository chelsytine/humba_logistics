import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FirebaseService, type FirestoreTruck } from '../../services/firebase.service';
import { Contact, type ContactMessage } from '../contact/contact';

const DEFAULT_PASSWORD = 'humba2025';
const PASSWORD_STORAGE_KEY = '_hba_ak';

function getStoredPassword(): string {
  try { return localStorage.getItem(PASSWORD_STORAGE_KEY) || DEFAULT_PASSWORD; }
  catch { return DEFAULT_PASSWORD; }
}

function setStoredPassword(newPassword: string): void {
  localStorage.setItem(PASSWORD_STORAGE_KEY, newPassword);
}

@Component({
  selector: 'app-admin',
  imports: [FormsModule, DatePipe],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {
  password = '';
  passwordError = signal(false);
  authenticated = signal(false);

  activeTab = signal<'fleet' | 'messages' | 'settings'>('fleet');

  // Fleet
  trucks = signal<FirestoreTruck[]>([]);
  editing = signal<{ id: string; data: FirestoreTruck } | null>(null);
  adding = signal(false);
  newTruck: FirestoreTruck = this.emptyTruck();
  editData: FirestoreTruck = this.emptyTruck();
  editId = '';
  flashMsg = signal('');
  flashType = signal<'success' | 'error'>('success');
  saving = signal(false);

  // Messages
  messages = signal<ContactMessage[]>([]);
  selectedMsg = signal<ContactMessage | null>(null);
  showChangePassword = signal(false);
  currentPw = '';
  newPw = '';
  confirmPw = '';
  pwChangeError = signal('');
  pwChangeSuccess = signal(false);

  constructor(private fb: FirebaseService) {}

  ngOnInit(): void {
    this.loadTrucks();
  }

  login(): void {
    if (this.password === getStoredPassword()) {
      this.authenticated.set(true);
      this.passwordError.set(false);
    } else {
      this.passwordError.set(true);
    }
  }

  logout(): void {
    this.authenticated.set(false);
    this.password = '';
    this.passwordError.set(false);
    this.selectedMsg.set(null);
    this.activeTab.set('fleet');
  }

  switchTab(tab: 'fleet' | 'messages' | 'settings'): void {
    this.activeTab.set(tab);
    if (tab === 'messages') { this.loadMessages(); }
  }

  // --- Fleet CRUD ---
  async loadTrucks(): Promise<void> {
    this.trucks.set(await this.fb.getAllTrucks());
  }

  startEdit(truck: FirestoreTruck, id: string): void {
    this.editId = id;
    this.editData = { ...truck };
    this.editing.set({ id, data: truck });
    this.adding.set(false);
  }

  cancelEdit(): void {
    this.editing.set(null);
    this.editId = '';
    this.editData = this.emptyTruck();
  }

  async saveEdit(): Promise<void> {
    this.saving.set(true);
    try {
      await this.fb.saveTruck(this.editId, this.editData);
      this.showFlash('Truck updated', 'success');
      this.cancelEdit();
      await this.loadTrucks();
    } catch { this.showFlash('Failed to save', 'error'); }
    this.saving.set(false);
  }

  startAdd(): void {
    this.adding.set(true);
    this.newTruck = this.emptyTruck();
    this.editing.set(null);
  }

  cancelAdd(): void {
    this.adding.set(false);
    this.newTruck = this.emptyTruck();
  }

  async saveNew(): Promise<void> {
    this.saving.set(true);
    try {
      const id = this.newTruck.name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
      this.newTruck.order = this.trucks().length + 1;
      await this.fb.saveTruck(id, this.newTruck);
      this.showFlash('Truck added', 'success');
      this.cancelAdd();
      await this.loadTrucks();
    } catch { this.showFlash('Failed to add', 'error'); }
    this.saving.set(false);
  }

  async deleteTruck(truck: FirestoreTruck, id: string): Promise<void> {
    if (!confirm(`Delete "${truck.name}"?`)) return;
    try {
      await this.fb.deleteTruck(id);
      this.showFlash('Truck deleted', 'success');
      await this.loadTrucks();
    } catch { this.showFlash('Failed to delete', 'error'); }
  }

  // --- Messages ---
  private async loadMessages(): Promise<void> {
    const local = Contact.getMessages();
    const remote = await this.fb.getAllMessages();
    const merged = [...remote];
    for (const lm of local) {
      if (!merged.find((m: any) => m.id === lm.id)) {
        merged.push(lm);
      }
    }
    this.messages.set(merged.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }

  refreshMsgs(): void { this.loadMessages(); }

  async markRead(msg: ContactMessage): Promise<void> {
    Contact.markAsRead(msg.id);
    await this.fb.markMsgRead(msg.id);
    await this.loadMessages();
  }

  async deleteMsg(msg: ContactMessage): Promise<void> {
    if (confirm(`Delete message from ${msg.name}?`)) {
      Contact.deleteMessage(msg.id);
      await this.fb.deleteMessage(msg.id);
      if (this.selectedMsg()?.id === msg.id) this.selectedMsg.set(null);
      await this.loadMessages();
    }
  }

  selectMsg(msg: ContactMessage): void {
    if (!msg.read) this.markRead(msg);
    this.selectedMsg.set(msg);
  }

  closeDetail(): void { this.selectedMsg.set(null); }

  get unreadCount(): number {
    return this.messages().filter(m => !m.read).length;
  }

  getServiceLabel(service: string): string {
    const map: Record<string, string> = {
      transport: 'Goods Transport & Delivery',
      removals: 'Removals',
      construction: 'Construction Logistics',
      other: 'Other / General Inquiry'
    };
    return map[service] || service;
  }

  // --- Password ---
  changePassword(): void {
    this.pwChangeError.set('');
    this.pwChangeSuccess.set(false);
    if (!this.currentPw || !this.newPw || !this.confirmPw) { this.pwChangeError.set('All fields required'); return; }
    if (this.currentPw !== getStoredPassword()) { this.pwChangeError.set('Current password incorrect'); return; }
    if (this.newPw.length < 4) { this.pwChangeError.set('Min 4 characters'); return; }
    if (this.newPw !== this.confirmPw) { this.pwChangeError.set('Passwords do not match'); return; }
    if (this.newPw === getStoredPassword()) { this.pwChangeError.set('Must differ from current'); return; }
    setStoredPassword(this.newPw);
    this.currentPw = ''; this.newPw = ''; this.confirmPw = '';
    this.pwChangeSuccess.set(true);
  }

  // --- Shared ---
  addFeature(target: FirestoreTruck): void { target.features.push(''); }
  removeFeature(target: FirestoreTruck, index: number): void {
    target.features.splice(index, 1);
    if (target.features.length === 0) target.features.push('');
  }

  trackByIndex(index: number): number { return index; }

  private showFlash(msg: string, type: 'success' | 'error'): void {
    this.flashMsg.set(msg);
    this.flashType.set(type);
    setTimeout(() => this.flashMsg.set(''), 4000);
  }

  private emptyTruck(): FirestoreTruck {
    return { name: '', type: '', capacity: '', dimensions: '', maxLoad: '', description: '', features: [''], image: '', order: 0 };
  }
}
