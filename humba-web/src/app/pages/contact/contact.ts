import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  date: string;
  read: boolean;
}

const STORAGE_KEY = 'humba_messages';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  private firebaseService = inject(FirebaseService);
  contactForm: FormGroup;
  submitted = false;
  submitSuccess = false;
  submitting = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^\+?[\d\s-]{7,15}$/)]],
      service: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    this.submitting = true;

    await this.saveMessage();
    this.submitting = false;
    this.submitSuccess = true;
    this.contactForm.reset();
    this.submitted = false;
  }

  private async saveMessage(): Promise<void> {
    const newMsg: ContactMessage = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36),
      name: this.f['name'].value.trim(),
      email: this.f['email'].value.trim(),
      phone: this.f['phone'].value?.trim() || '',
      service: this.f['service'].value,
      message: this.f['message'].value.trim(),
      date: new Date().toISOString(),
      read: false
    };

    const existing = Contact.getMessages();
    existing.unshift(newMsg);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    await this.firebaseService.sendMessage(newMsg);
  }

  static getMessages(): ContactMessage[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  static markAsRead(id: string): void {
    const msgs = Contact.getMessages();
    const msg = msgs.find((m: ContactMessage) => m.id === id);
    if (msg) {
      msg.read = true;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
    }
  }

  static deleteMessage(id: string): void {
    const msgs = Contact.getMessages().filter((m: ContactMessage) => m.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
  }

  resetForm(): void {
    this.submitSuccess = false;
    this.submitted = false;
  }
}
