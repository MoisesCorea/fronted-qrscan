import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HeaderMenus } from '../Models/header-menus.dto';

@Injectable({
  providedIn: 'root',
})
export class HeaderMenusService {
  headerManagement: BehaviorSubject<HeaderMenus> =
    new BehaviorSubject<HeaderMenus>({
      showAuthSection: false,
      showNoAuthSection: true,
    });

  constructor() {}

  updateHeaderMenus(isAuthenticated: boolean): void {
    const headerInfo: HeaderMenus = {
      showAuthSection: isAuthenticated,
      showNoAuthSection: !isAuthenticated,
    };
    console.log(headerInfo);
    this.headerManagement.next(headerInfo);
  }
}
