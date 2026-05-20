import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Appear } from '../../shared/appear';

@Component({
  selector: 'app-investor',
  imports: [RouterLink, Appear],
  templateUrl: './investor.html',
  styleUrl: './investor.css'
})
export class Investor {}
