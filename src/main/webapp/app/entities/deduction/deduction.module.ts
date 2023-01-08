import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DeductionComponent } from './list/deduction.component';
import { DeductionDetailComponent } from './detail/deduction-detail.component';
import { DeductionUpdateComponent } from './update/deduction-update.component';
import { DeductionDeleteDialogComponent } from './delete/deduction-delete-dialog.component';
import { DeductionRoutingModule } from './route/deduction-routing.module';

@NgModule({
  imports: [SharedModule, DeductionRoutingModule],
  declarations: [DeductionComponent, DeductionDetailComponent, DeductionUpdateComponent, DeductionDeleteDialogComponent],
  entryComponents: [DeductionDeleteDialogComponent],
})
export class DeductionModule {}
