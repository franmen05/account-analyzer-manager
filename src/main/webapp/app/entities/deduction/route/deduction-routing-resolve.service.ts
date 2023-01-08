import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDeduction, Deduction } from '../deduction.model';
import { DeductionService } from '../service/deduction.service';

@Injectable({ providedIn: 'root' })
export class DeductionRoutingResolveService implements Resolve<IDeduction> {
  constructor(protected service: DeductionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDeduction> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((deduction: HttpResponse<Deduction>) => {
          if (deduction.body) {
            return of(deduction.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Deduction());
  }
}
