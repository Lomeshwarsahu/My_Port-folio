import { Component,ElementRef,HostListener, ViewChild  } from '@angular/core';
import { Offcanvas } from 'bootstrap';
import { Router, NavigationEnd } from '@angular/router';
import * as bootstrap from 'bootstrap';
// import * as AOS from 'aos';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent {
  isDarkMode = false;
  activeMenu: any;
  @ViewChild('offcanvasRef', { static: false }) offcanvasRef!: ElementRef;
  private bsOffcanvas!: Offcanvas;
  selectedColor: any;
  Menu: string = 'home';
  groupedproject: any[][] = [];
  projects = [
    {
      title: 'Seva Gudi',
      description: ' Service Provider system to find and book nearby services, built with Angular & Capacitor, using REST API and SQL Server for data management.',
      image: 'assets/img/logo.png',
    },
    {
      title: 'KOT(Kitchen Order Ticket)',
      description: 'Restaurant Management System – A system where waiters can take orders and submit them to the kitchen, developed using AngularJS with Capacitor, and data managed via API using SQL Server.',
      image: 'assets/img/logo 512.png',
    },
    {
      title: 'Paddy Management',
      description: 'Paddy Sale and Purchase System – Facilitates the sale and purchase of paddy with report generation for accurate measurement and detailed information. Implemented using the .NET Framework and MS Access database.',
      image: 'assets/img/icon 512.png',
    },
    {
      title: 'Insta Messanger',
      description: 'Sale and Purchase of Paddy system with report generation that ensures accurate measurement and detailed information. Developed using .NET Framework with MS Access database.',
      image: 'assets/img/landing3.png',
    },
    {
      title: 'Product Tracking System',
      description: 'Product tracking using QR scanning and Google Maps integration in AGM. A hybrid app supporting Android, iOS, and Web platforms. REST APIs handled using the Core HTTP package.',
      image: 'assets/img/icon 512.png',
    },
    {
      title: 'Chhattisgarh Aushdhi Darpan',
      description:
        ' A government dashboard project showcasing detailed reports on Drugs, Equipment, and Infrastructure, streamlining operations and enhancing efficiency.',
      image: 'assets/img/icon-72x72.png',
    },
  ];
  constructor(private router: Router) {}

  ngOnInit() {
    this.selectedColor = sessionStorage.getItem('selectedColor');
    if (
      this.selectedColor !=
      'linear-gradient(1deg, rgb(18, 166, 210) 15%, rgb(49, 65, 252) 100%)'
    ) {
      document.documentElement.style.setProperty(
        '--theme-gradient',
        this.selectedColor
      );
    }
    // AOS.init();
    // localStorage.setItem('activeMenu', this.Menu);
    const storedMenu = localStorage.getItem('activeMenu');
    if (storedMenu) {
      this.activeMenu = storedMenu;
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const fragment = this.router.url.split('#')[1];
        this.activeMenu = fragment || 'home'; // Set to home if no fragment
      }
    });
    this.setGroupingBasedOnViewport();
  }
  @HostListener('window:resize', [])
  onResize() {
    this.setGroupingBasedOnViewport();
  }
  setGroupingBasedOnViewport() {
    const width = window.innerWidth;
    this.groupedproject = []; // reset before grouping

    if (width < 768) {
      this.groupproject(1); // mobile
    } else {
      this.groupproject(3); // desktop/tablet
    }
  }
  groupproject(size: number) {
    for (let i = 0; i < this.projects.length; i += size) {
      this.groupedproject.push(this.projects.slice(i, i + size));
    }
  }

  //   groupproject(size: number) {
  //     for (let i = 0; i < this.projects.length; i += size) {
  //       this.groupedproject.push(this.projects.slice(i, i + size));
  //     }
  // }

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
    const bsOffcanvas =
      bootstrap.Offcanvas.getInstance(offcanvasEl) ||
      new bootstrap.Offcanvas(offcanvasEl);
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
      document
        .querySelectorAll('.offcanvas-backdrop')
        .forEach((b) => b.remove());

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
  // gradients: string[] = [
  //   'linear-gradient(1deg, rgb(18, 166, 210) 15%, rgb(49, 65, 252) 100%)',
  //   'linear-gradient(180deg, #FF6000 11%, #FFA559 100%)',
  //   'linear-gradient(rgb(93, 18, 210) 11%, rgb(184, 49, 252) 100%)',
  //   'linear-gradient(180deg,rgb(182, 35, 162) 11%,rgb(228, 156, 247) 100%)',

  // ];

  // setTheme(gradient: string) {
  //   sessionStorage.setItem('selectedColor',gradient);
  //   document.documentElement.style.setProperty('--theme-gradient', gradient);

  // }

  // projects: string[] = [
  //   'https://dpdmis.in/cdn/News/48385277-51e6-4dcb-a2ff-5beb3b1f8528.jfif',
  //   'https://dpdmis.in/cdn/News/b2bdb353-f7ed-484b-9d12-f53e2c8cfe85.jfif',
  //   'https://dpdmis.in/cdn/News/ba0ed618-ec63-4f2b-b977-786fbe807576.jfif',
  //   'https://dpdmis.in/cdn/News/Capture.JPG',
  //   'https://dpdmis.in/cdn/News/cd01d37c-4a6c-486b-b3f6-bc94fb650a96.jfif',
  //   'https://dpdmis.in/cdn/News/img1.jpg.jfif',
  //   'https://dpdmis.in/cdn/News/news.JPG',
  //   'https://dpdmis.in/cdn/News/WhatsApp%20Image%202025-05-19%20at%209.42.17%20PM.jpeg',
  //   'https://dpdmis.in/cdn/News/img1.jpg.jfif',
  //   'https://dpdmis.in/cdn/News/WhatsApp%20Image%202025-07-11%20at%2012.03.15.jpeg',
  // ];
}
