import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DeductionType } from 'app/entities/enumerations/deduction-type.model';
import { IDeduction, Deduction } from '../deduction.model';

import { DeductionService } from './deduction.service';

describe('Deduction Service', () => {
  let service: DeductionService;
  let httpMock: HttpTestingController;
  let elemDefault: IDeduction;
  let expectedResult: IDeduction | IDeduction[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DeductionService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      description: 'AAAAAAA',
      type: DeductionType.COMMISSIONS,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Deduction', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Deduction()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Deduction', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          description: 'BBBBBB',
          type: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Deduction', () => {
      const patchObject = Object.assign({}, new Deduction());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Deduction', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          description: 'BBBBBB',
          type: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Deduction', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addDeductionToCollectionIfMissing', () => {
      it('should add a Deduction to an empty array', () => {
        const deduction: IDeduction = { id: 123 };
        expectedResult = service.addDeductionToCollectionIfMissing([], deduction);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(deduction);
      });

      it('should not add a Deduction to an array that contains it', () => {
        const deduction: IDeduction = { id: 123 };
        const deductionCollection: IDeduction[] = [
          {
            ...deduction,
          },
          { id: 456 },
        ];
        expectedResult = service.addDeductionToCollectionIfMissing(deductionCollection, deduction);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Deduction to an array that doesn't contain it", () => {
        const deduction: IDeduction = { id: 123 };
        const deductionCollection: IDeduction[] = [{ id: 456 }];
        expectedResult = service.addDeductionToCollectionIfMissing(deductionCollection, deduction);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(deduction);
      });

      it('should add only unique Deduction to an array', () => {
        const deductionArray: IDeduction[] = [{ id: 123 }, { id: 456 }, { id: 41773 }];
        const deductionCollection: IDeduction[] = [{ id: 123 }];
        expectedResult = service.addDeductionToCollectionIfMissing(deductionCollection, ...deductionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const deduction: IDeduction = { id: 123 };
        const deduction2: IDeduction = { id: 456 };
        expectedResult = service.addDeductionToCollectionIfMissing([], deduction, deduction2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(deduction);
        expect(expectedResult).toContain(deduction2);
      });

      it('should accept null and undefined values', () => {
        const deduction: IDeduction = { id: 123 };
        expectedResult = service.addDeductionToCollectionIfMissing([], null, deduction, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(deduction);
      });

      it('should return initial array if no Deduction is added', () => {
        const deductionCollection: IDeduction[] = [{ id: 123 }];
        expectedResult = service.addDeductionToCollectionIfMissing(deductionCollection, undefined, null);
        expect(expectedResult).toEqual(deductionCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
