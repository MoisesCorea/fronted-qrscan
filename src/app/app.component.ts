import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { AdminService } from './Services/admin.service';
import { AuthService } from 'src/app/Services/auth.service';
import { RolesService } from 'src/app/Services/roles.service';
import { AdminDTO } from './Models/admin.dto';
import { SharedService } from 'src/app/Services/shared.service';
import { LoaderService } from './Services/loader.service';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Role } from 'src/app/Models/rol.type';
import { UserDTO } from './Models/user.dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  observe(arg0: string[]) {
    throw new Error('Method not implemented.');
  }
  title = 'QrScan';
  loading = false;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = true;
  userRol?: string | null;

  private cachedAdmins: { [radminId: string]: Observable<string> } = {};

  adminId!: string | null;

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    public headerMenusService: HeaderMenusService,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private rolesService: RolesService,
    private sharedService: SharedService,
    private adminService: AdminService,
    public loaderService: LoaderService
  ) {
    this.adminId = this.localStorageService.get('user_id');
  }

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

  getAdminName(adminId: string): Observable<string> {
    if (this.cachedAdmins[adminId]) {
      return this.cachedAdmins[adminId];
    } else {
      const admins$ = this.adminService.getAdminById(adminId).pipe(
        map((admin: AdminDTO) => {
          return admin.alias;
        }),
        catchError((error) => {
          console.error('Error obteniendo el nombre del rol:', error);
          return of('Error al obtener el nombre del rol');
        })
      );

      this.cachedAdmins[adminId] = admins$;
      return admins$;
    }
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
