import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Appear } from '../../shared/appear';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Appear],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}
