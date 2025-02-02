import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '../../../../+state/auth.facade';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-masterbooks-popup',
  templateUrl: './masterbooks-popup.component.html',
  styleUrls: ['./masterbooks-popup.component.less']
})
export class MasterbooksPopupComponent implements OnInit {

  private static BOOKS: { [index: number]: number[] } = {
    //CRP
    8: [8135, 7778, 9336, 12244, 14126, 17869, 22309, 7786],
    //BSM
    9: [8136, 7779, 9337, 12245, 14127, 17870, 22310, 7787],
    //ARM
    10: [8137, 7780, 9338, 12246, 14128, 17871, 22311, 7788],
    //GSM
    11: [8138, 7781, 9339, 12247, 14129, 17872, 22312, 7789],
    //LTW
    12: [8139, 7782, 9340, 12248, 14130, 17873, 22313, 7790],
    //WVR
    13: [8140, 7783, 9341, 12249, 14131, 17874, 22314,7791],
    //ALC
    14: [8141, 7784, 9342, 12250, 14132, 17875, 22315, 7792],
    //CUL
    15: [7785, 9343, 12251, 14133, 17876, 22316],
    //MIN
    16: [12238, 12239, 12240, 17838, 17839, 26808],
    //BTN
    17: [12698, 12699, 12700, 17840, 17841, 26809],
    //FSH
    18: [12701, 12702, 12703, 17842, 17843, 26810]
  };

  masterbooks$: Observable<{ id: number, checked: boolean }[]>;

  public jobId: number;

  constructor(private authFacade: AuthFacade, private modalRef: NzModalRef) {
  }

  ngOnInit(): void {
    this.masterbooks$ = this.authFacade.mainCharacterEntry$.pipe(
      map(entry => {
        const books = MasterbooksPopupComponent.BOOKS[this.jobId];
        return books.map(book => {
          return {
            id: book,
            checked: (entry.masterbooks || []).indexOf(book) > -1
          };
        });
      })
    );
  }

  checkAll(books: { id: number, checked: boolean }[]): void {
    books.forEach(book => book.checked = true);
  }

  save(books: { id: number, checked: boolean }[]): void {
    this.authFacade.saveMasterbooks(books);
    this.modalRef.close();
  }

  cancel(): void {
    this.modalRef.close();
  }
}
