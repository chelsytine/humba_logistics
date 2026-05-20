import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { WhatsAppButton } from './shared/whatsapp-button/whatsapp-button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, WhatsAppButton],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
