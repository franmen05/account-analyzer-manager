import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DeductionComponent } from '../list/deduction.component';
import { DeductionDetailComponent } from '../detail/deduction-detail.component';
import { DeductionUpdateComponent } from '../update/deduction-update.component';
import { DeductionRoutingResolveService } from './deduction-routing-resolve.service';

const deductionRoute: Routes = [
  {
    path: '',
    component: DeductionComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DeductionDetailComponent,
    resolve: {
      deduction: DeductionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DeductionUpdateComponent,
    resolve: {
      deduction: DeductionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DeductionUpdateComponent,
    resolve: {
      deduction: DeductionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(deductionRoute)],
  exports: [RouterModule],
})
export class DeductionRoutingModule {}
