import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DeductionDetailComponent } from './deduction-detail.component';

describe('Deduction Management Detail Component', () => {
  let comp: DeductionDetailComponent;
  let fixture: ComponentFixture<DeductionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeductionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ deduction: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DeductionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DeductionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load deduction on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.deduction).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
