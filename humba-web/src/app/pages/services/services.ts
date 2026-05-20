import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Appear } from '../../shared/appear';

@Component({
  selector: 'app-services',
  imports: [RouterLink, Appear],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class Services {}
