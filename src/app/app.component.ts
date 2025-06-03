import { Component,ElementRef,HostListener, ViewChild  } from '@angular/core';
import { Offcanvas } from 'bootstrap';
import { Router, NavigationEnd } from '@angular/router';
import * as bootstrap from 'bootstrap';
// import * as AOS from 'aos';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  isDarkMode = false;
  activeMenu:any;
  @ViewChild('offcanvasRef', { static: false }) offcanvasRef!: ElementRef;
  private bsOffcanvas!: Offcanvas;
  selectedColor:any;
  Menu: string = 'home';
  projects = [
    { title: 'Project 1', description: 'Description of project 1', image: 'https://via.placeholder.com/400', link: '#' },
    { title: 'Project 2', description: 'Description of project 2', image: 'https://via.placeholder.com/400', link: '#' },
    { title: 'Project 3', description: 'Description of project 3', image: 'https://via.placeholder.com/400', link: '#' }
  ];
  constructor(private router: Router) {

  }

  ngOnInit() {
    this.selectedColor = sessionStorage.getItem('selectedColor');
    if(this.selectedColor != 'linear-gradient(1deg, rgb(18, 166, 210) 15%, rgb(49, 65, 252) 100%)'){
      document.documentElement.style.setProperty('--theme-gradient', this.selectedColor );
    }
      // AOS.init();
    // localStorage.setItem('activeMenu', this.Menu);
    const storedMenu = localStorage.getItem('activeMenu');
    if (storedMenu) {
      this.activeMenu = storedMenu;
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const fragment = this.router.url.split('#')[1];
        this.activeMenu = fragment || 'home'; // Set to home if no fragment
      }
    });
  }
  setActive(menu: string) {
    this.activeMenu = menu;
    localStorage.setItem('activeMenu', menu);
  }

  // setActive(menu: string): void {
  //   this.activeMenu = menu;
  // }
  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     const elements = document.querySelectorAll('.animate-on-scroll');
  
  //     const observer = new IntersectionObserver((entries, observer) => {
  //       entries.forEach(entry => {
  //         if (entry.isIntersecting) {
  //           entry.target.classList.add('visible');
  //           observer.unobserve(entry.target);
  //         }
  //       });
  //     }, { threshold: 0.1 });
  
  //     elements.forEach(el => observer.observe(el));
  //   }, 100); // delay observer by 100ms
  // }
  
  
  
  
  

  // ngAfterViewInit(): void {
  //   this.bsOffcanvas = new Offcanvas(this.offcanvasRef.nativeElement);
  // }
  dismissOffcanvas() {
    const offcanvasEl = this.offcanvasRef.nativeElement;
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl) || new bootstrap.Offcanvas(offcanvasEl);
    bsOffcanvas.hide();
  }
 
navigateAndClose(fragment: string) {
 

    localStorage.setItem('activeMenu', fragment);
  const el = document.getElementById('offcanvasNavbar');
  const bsOffcanvas = Offcanvas.getInstance(el!) || new Offcanvas(el!);
  // Hide the offcanvas
  bsOffcanvas.hide();

  // Navigate without reload
  this.router.navigate([], { fragment }).then(() => {
    // Scroll to fragment after DOM update
    setTimeout(() => {
      const target = document.getElementById(fragment);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  });

  // Remove leftover backdrops and inline styles from <body>
  setTimeout(() => {
    // Remove backdrops
    document.querySelectorAll('.offcanvas-backdrop').forEach(b => b.remove());

    // Clear inline styles on body
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }, 400);
}
openOffcanvas() {
  const el = document.getElementById('offcanvasNavbar');
  if (el) {
    const bsOffcanvas = Offcanvas.getInstance(el) || new Offcanvas(el);
    bsOffcanvas.show();
  }
}

 

  scrollToSection(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  gradients: string[] = [
    'linear-gradient(1deg, rgb(18, 166, 210) 15%, rgb(49, 65, 252) 100%)',
    'linear-gradient(180deg, #FF6000 11%, #FFA559 100%)',
    'linear-gradient(rgb(93, 18, 210) 11%, rgb(184, 49, 252) 100%)', 
    'linear-gradient(180deg,rgb(182, 35, 162) 11%,rgb(228, 156, 247) 100%)',

  ];

  setTheme(gradient: string) {
    sessionStorage.setItem('selectedColor',gradient);
    document.documentElement.style.setProperty('--theme-gradient', gradient);
    
  }
}
