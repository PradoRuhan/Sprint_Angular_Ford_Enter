import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from '../../shared/header/header';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    Header
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  menuAberto = false;

  alternarMenu() {
    this.menuAberto = !this.menuAberto;
  }

}