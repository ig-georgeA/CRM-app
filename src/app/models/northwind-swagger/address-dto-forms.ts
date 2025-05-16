import { FormControl } from '@angular/forms';

export interface AddressDtoForm {
  street: FormControl<string | null>
  city: FormControl<string | null>
  region: FormControl<string | null>
  postalCode: FormControl<string | null>
  country: FormControl<string | null>
  phone: FormControl<string | null>
}
