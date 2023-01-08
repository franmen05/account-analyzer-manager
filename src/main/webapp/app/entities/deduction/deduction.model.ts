import { IUser } from 'app/entities/user/user.model';
import { DeductionType } from 'app/entities/enumerations/deduction-type.model';

export interface IDeduction {
  id?: number;
  description?: string | null;
  type?: DeductionType | null;
  user?: IUser | null;
}

export class Deduction implements IDeduction {
  constructor(public id?: number, public description?: string | null, public type?: DeductionType | null, public user?: IUser | null) {}
}

export function getDeductionIdentifier(deduction: IDeduction): number | undefined {
  return deduction.id;
}
