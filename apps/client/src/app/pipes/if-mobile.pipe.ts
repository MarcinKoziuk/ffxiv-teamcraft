import { Pipe, PipeTransform } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { PlatformService } from '../core/tools/platform.service';

@Pipe({
  name: 'ifMobile',
  pure: false
})
export class IfMobilePipe implements PipeTransform {

  constructor(private media: ObservableMedia, private platformService: PlatformService) {
  }

  transform(nonMobileValue: any, mobileValue: any): any {
    if (this.platformService.isMobileApp() || this.media.isActive('xs') || this.media.isActive('sm')) {
      return mobileValue;
    }
    return nonMobileValue;
  }

}
