import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDeduction } from '../deduction.model';
import { DeductionService } from '../service/deduction.service';

@Component({
  templateUrl: './deduction-delete-dialog.component.html',
})
export class DeductionDeleteDialogComponent {
  deduction?: IDeduction;

  constructor(protected deductionService: DeductionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.deductionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
