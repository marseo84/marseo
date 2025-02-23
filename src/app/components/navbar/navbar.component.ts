import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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

  constructor(private router: Router) {}

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

    // close the sidebar when navigation occurs

    this.router.events.subscribe(() => {
      if (this.isMobileView) {
        this.closeSidebar();
      }
    });
  }

  // Toggle navbar on smaller screens
  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  closeSidebar() {
    this.isNavbarOpen = false;
  }

  // Helper function for template
  isMobile() {
    return this.isMobileView;
  }
}
