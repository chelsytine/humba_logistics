import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Contact, type ContactMessage } from '../contact/contact';

const DEFAULT_PASSWORD = 'humba2025';
const PASSWORD_STORAGE_KEY = '_hba_ak';

function getStoredPassword(): string {
  try {
    return localStorage.getItem(PASSWORD_STORAGE_KEY) || DEFAULT_PASSWORD;
  } catch {
    return DEFAULT_PASSWORD;
  }
}

function setStoredPassword(newPassword: string): void {
  localStorage.setItem(PASSWORD_STORAGE_KEY, newPassword);
}

@Component({
  selector: 'app-messages',
  imports: [FormsModule, DatePipe],
  templateUrl: './messages.html',
  styleUrl: './messages.css'
})
export class Messages {
  authenticated = signal(false);
  passwordInput = '';
  passwordError = signal(false);
  messages = signal<ContactMessage[]>([]);
  selectedMsg = signal<ContactMessage | null>(null);

  showChangePassword = signal(false);
  currentPw = '';
  newPw = '';
  confirmPw = '';
  pwChangeError = signal('');
  pwChangeSuccess = signal(false);

  login(): void {
    if (this.passwordInput === getStoredPassword()) {
      this.authenticated.set(true);
      this.passwordError.set(false);
      this.loadMessages();
    } else {
      this.passwordError.set(true);
    }
  }

  logout(): void {
    this.authenticated.set(false);
    this.passwordInput = '';
    this.passwordError.set(false);
    this.selectedMsg.set(null);
    this.showChangePassword.set(false);
    this.pwChangeSuccess.set(false);
  }

  changePassword(): void {
    this.pwChangeError.set('');
    this.pwChangeSuccess.set(false);

    if (!this.currentPw || !this.newPw || !this.confirmPw) {
      this.pwChangeError.set('All fields are required');
      return;
    }

    if (this.currentPw !== getStoredPassword()) {
      this.pwChangeError.set('Current password is incorrect');
      return;
    }

    if (this.newPw.length < 4) {
      this.pwChangeError.set('New password must be at least 4 characters');
      return;
    }

    if (this.newPw !== this.confirmPw) {
      this.pwChangeError.set('New passwords do not match');
      return;
    }

    if (this.newPw === getStoredPassword()) {
      this.pwChangeError.set('New password must be different from current');
      return;
    }

    setStoredPassword(this.newPw);
    this.currentPw = '';
    this.newPw = '';
    this.confirmPw = '';
    this.pwChangeSuccess.set(true);
  }

  private loadMessages(): void {
    this.messages.set(Contact.getMessages());
  }

  refresh(): void {
    this.loadMessages();
  }

  markRead(msg: ContactMessage): void {
    Contact.markAsRead(msg.id);
    this.loadMessages();
  }

  deleteMsg(msg: ContactMessage): void {
    if (confirm(`Delete message from ${msg.name}?`)) {
      Contact.deleteMessage(msg.id);
      if (this.selectedMsg()?.id === msg.id) {
        this.selectedMsg.set(null);
      }
      this.loadMessages();
    }
  }

  selectMsg(msg: ContactMessage): void {
    if (!msg.read) {
      this.markRead(msg);
    }
    this.selectedMsg.set(msg);
  }

  closeDetail(): void {
    this.selectedMsg.set(null);
  }

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
}
