import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IDeduction, Deduction } from '../deduction.model';
import { DeductionService } from '../service/deduction.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { DeductionType } from 'app/entities/enumerations/deduction-type.model';

@Component({
  selector: 'jhi-deduction-update',
  templateUrl: './deduction-update.component.html',
})
export class DeductionUpdateComponent implements OnInit {
  isSaving = false;
  deductionTypeValues = Object.keys(DeductionType);

  usersSharedCollection: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    description: [],
    type: [],
    user: [],
  });

  constructor(
    protected deductionService: DeductionService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ deduction }) => {
      this.updateForm(deduction);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const deduction = this.createFromForm();
    if (deduction.id !== undefined) {
      this.subscribeToSaveResponse(this.deductionService.update(deduction));
    } else {
      this.subscribeToSaveResponse(this.deductionService.create(deduction));
    }
  }

  trackUserById(index: number, item: IUser): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDeduction>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(deduction: IDeduction): void {
    this.editForm.patchValue({
      id: deduction.id,
      description: deduction.description,
      type: deduction.type,
      user: deduction.user,
    });

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing(this.usersSharedCollection, deduction.user);
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing(users, this.editForm.get('user')!.value)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }

  protected createFromForm(): IDeduction {
    return {
      ...new Deduction(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
      type: this.editForm.get(['type'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }
}
