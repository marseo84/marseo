import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
})
export class NavbarComponent implements OnInit {
  isNavbarOpen = false;
  isMobileView = false;

  // Check window width to determine if it's mobile
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobileView = window.innerWidth < 768;

    // close on mobile
    if (this.isMobileView) {
      this.isNavbarOpen = false;
    } else {
      this.isNavbarOpen = true;
    }
  }

  // Initial check on load
  ngOnInit() {
    this.onResize();
  }

  // Toggle navbar on smaller screens
  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  // Helper function for template
  isMobile() {
    return this.isMobileView;
  }
}
