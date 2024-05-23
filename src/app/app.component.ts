import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { HeaderMenus } from 'src/app/Models/header-menus.dto';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { AuthService } from 'src/app/Services/auth.service';
import { RolesService } from 'src/app/Services/roles.service';
import { RolesDTO } from 'src/app/Models/roles.dto';
import { SharedService } from 'src/app/Services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role } from 'src/app/Models/rol.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'QrScan';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = true;
  userRol?: string | null;

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    public headerMenusService: HeaderMenusService,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private rolesService: RolesService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    const isAuthenticated = this.authService.isAuthenticated();
    this.headerMenusService.updateHeaderMenus(isAuthenticated);

    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  userRolIn(allowedRoles: Role[]): boolean {
    this.userRol = this.localStorageService.get('rol');

    if (this.userRol && allowedRoles.includes(this.userRol as Role)) {
      return true;
    }
    return false;
  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }
  }

  login(): void {
    this.router.navigateByUrl('login');
  }
  logout(): void {
    this.authService.logout().subscribe(
      () => {
        console.log('Logged out successfully');
      },
      (error) => {
        console.error('Error logging out:', error);
      }
    );

    this.localStorageService.remove('user_id');
    this.localStorageService.remove('access_token');
    this.localStorageService.remove('rol');

    const isAuthenticated = this.authService.isAuthenticated();

    this.headerMenusService.updateHeaderMenus(isAuthenticated);

    this.router.navigateByUrl('home');
  }
}
