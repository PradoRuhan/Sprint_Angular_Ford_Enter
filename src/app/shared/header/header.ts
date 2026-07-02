import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  @Output()
  toggleMenu = new EventEmitter<void>();

  menuOpen = false;

  constructor(private router: Router){}

  abrirMenu(): void{

    this.menuOpen = !this.menuOpen;

    this.toggleMenu.emit();

  }

  logout(): void{

    this.router.navigate(['/login']);

  }

}