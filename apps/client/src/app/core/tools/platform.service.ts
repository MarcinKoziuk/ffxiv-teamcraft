import { Injectable } from '@angular/core';

export const IS_ELECTRON = navigator.userAgent.toLowerCase().indexOf('electron/') > -1;

export const IS_CORDOVA = !!(<any>window).cordova;

@Injectable()
export class PlatformService {

  public isDesktop(): boolean {
    return IS_ELECTRON;
  }

  public isMobileApp(): boolean {
    return IS_CORDOVA;
  }
}
