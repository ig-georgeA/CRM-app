import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SalesType } from '../models/financial/sales-type';
import { Financial } from '../static-data/financial';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {
  public getSales(): Observable<SalesType[]> {
    return of(Financial['SalesType']);
  }
}
