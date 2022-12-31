import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'deduction',
        data: { pageTitle: 'Deductions' },
        loadChildren: () => import('./deduction/deduction.module').then(m => m.DeductionModule),
      },
      {
        path: 'aa',
        data: { pageTitle: 'AAS' },
        loadChildren: () => import('./aa/aa.module').then(m => m.AAModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
