import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDeduction, getDeductionIdentifier } from '../deduction.model';

export type EntityResponseType = HttpResponse<IDeduction>;
export type EntityArrayResponseType = HttpResponse<IDeduction[]>;

@Injectable({ providedIn: 'root' })
export class DeductionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/deductions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(deduction: IDeduction): Observable<EntityResponseType> {
    return this.http.post<IDeduction>(this.resourceUrl, deduction, { observe: 'response' });
  }

  update(deduction: IDeduction): Observable<EntityResponseType> {
    return this.http.put<IDeduction>(`${this.resourceUrl}/${getDeductionIdentifier(deduction) as number}`, deduction, {
      observe: 'response',
    });
  }

  partialUpdate(deduction: IDeduction): Observable<EntityResponseType> {
    return this.http.patch<IDeduction>(`${this.resourceUrl}/${getDeductionIdentifier(deduction) as number}`, deduction, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDeduction>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDeduction[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDeductionToCollectionIfMissing(
    deductionCollection: IDeduction[],
    ...deductionsToCheck: (IDeduction | null | undefined)[]
  ): IDeduction[] {
    const deductions: IDeduction[] = deductionsToCheck.filter(isPresent);
    if (deductions.length > 0) {
      const deductionCollectionIdentifiers = deductionCollection.map(deductionItem => getDeductionIdentifier(deductionItem)!);
      const deductionsToAdd = deductions.filter(deductionItem => {
        const deductionIdentifier = getDeductionIdentifier(deductionItem);
        if (deductionIdentifier == null || deductionCollectionIdentifiers.includes(deductionIdentifier)) {
          return false;
        }
        deductionCollectionIdentifiers.push(deductionIdentifier);
        return true;
      });
      return [...deductionsToAdd, ...deductionCollection];
    }
    return deductionCollection;
  }
}
