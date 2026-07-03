import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  menuOpen = false;

  @Output()
  toggleMenu = new EventEmitter<void>();

  abrirMenu(): void {

    this.menuOpen = !this.menuOpen;

    this.toggleMenu.emit();

  }
}
