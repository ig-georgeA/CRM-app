import { FormControl, FormGroup } from '@angular/forms';
import { AddressDtoForm } from './address-dto-forms';

export interface CustomerDtoForm {
  customerId: FormControl<string | null>
  companyName: FormControl<string | null>
  contactName: FormControl<string | null>
  contactTitle: FormControl<string | null>
  address: FormGroup<AddressDtoForm>
}
