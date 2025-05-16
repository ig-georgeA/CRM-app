import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IGridEditDoneEventArgs, IGX_DIALOG_DIRECTIVES, IGX_GRID_ACTION_STRIP_DIRECTIVES, IGX_GRID_DIRECTIVES, IGX_INPUT_GROUP_DIRECTIVES, IGX_SELECT_DIRECTIVES, IgxAvatarComponent, IgxButtonDirective, IgxDialogComponent, IgxIconComponent, IgxPaginatorComponent, IgxRippleDirective, IgxSnackbarComponent, IRowDataEventArgs } from '@infragistics/igniteui-angular';
import { firstValueFrom, Subject, take, takeUntil } from 'rxjs';
import { CustomerDtoForm } from '../models/northwind-swagger/customer-dto-forms';
import { CustomerDto } from '../models/northwind-swagger/customer-dto';
import { CustomerDtoPagedResultDto } from '../models/northwind-swagger/customer-dto-paged-result-dto';
import { NorthwindSwaggerService } from '../services/northwind-swagger.service';

@Component({
  selector: 'app-accounts',
  imports: [IGX_GRID_ACTION_STRIP_DIRECTIVES, IGX_INPUT_GROUP_DIRECTIVES, IGX_SELECT_DIRECTIVES, IGX_DIALOG_DIRECTIVES, IGX_GRID_DIRECTIVES, IgxAvatarComponent, IgxIconComponent, IgxButtonDirective, IgxRippleDirective, IgxPaginatorComponent, IgxSnackbarComponent, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, OnDestroy {
  advancedFilteringExpressionsTree =	{
    "filteringOperands": [],
    "operator": 0,
    "entity": null,
    "returnFields": null
  };	


  @ViewChild('newAccountDialog', { static: true, read: IgxDialogComponent})
  private newAccountDialog?: IgxDialogComponent;

  private destroy$: Subject<void> = new Subject<void>();
  public selectedCustomer?: CustomerDto;

  private _grid_Page_Index: number = 0;
  public get grid_Page_Index(): number {
    return this._grid_Page_Index;
  }
  public set grid_Page_Index(value: number) {
    this._grid_Page_Index = value;
    this.grid_Data_Request$.next();
  }

  private _grid_Page_Size: number = 20;
  public get grid_Page_Size(): number {
    return this._grid_Page_Size;
  }
  public set grid_Page_Size(value: number) {
    this._grid_Page_Size = value;
    this.grid_Data_Request$.next();
  }
  public grid_Data_Request?: CustomerDtoPagedResultDto;
  public grid_Data_Request$: Subject<void> = new Subject<void>();

  public value: any = 2;
  public value1: any = 1;
  public customerDtoFormModel: FormGroup<CustomerDtoForm>;

  constructor(
    private northwindSwaggerService: NorthwindSwaggerService,
  ) {
    this.customerDtoFormModel = this.createCustomerDtoFormGroup();
  }


  ngOnInit() {
    this.northwindSwaggerService.getCustomerDtoPagedResultDto(this.grid_Page_Index as any, this.grid_Page_Size as any, '').pipe(takeUntil(this.destroy$)).subscribe(
      data => this.grid_Data_Request = data
    );
    this.grid_Data_Request$.pipe(takeUntil(this.destroy$)).subscribe(
      () => { this.northwindSwaggerService.getCustomerDtoPagedResultDto(this.grid_Page_Index as any, this.grid_Page_Size as any, '').pipe(take(1)).subscribe(
        data => this.grid_Data_Request = data
    )});
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.grid_Data_Request$.complete();
  }

  public async rowAddedGrid(e: IRowDataEventArgs): Promise<void> {
    await firstValueFrom(this.northwindSwaggerService.postCustomerDto(e.rowData));
  }

  public async rowEditDoneGrid(e: IGridEditDoneEventArgs): Promise<void> {
    if(e.isAddRow == false) {
      await firstValueFrom(this.northwindSwaggerService.putCustomerDto(e.rowData));
    }
  }

  public async rowDeletedGrid(e: IRowDataEventArgs): Promise<void> {
    await firstValueFrom(this.northwindSwaggerService.deleteCustomerDto(e.rowKey?.customerId));
  }

  public async ngSubmitCustomerDto(): Promise<void> {
    await firstValueFrom(this.northwindSwaggerService.postCustomerDto(this.customerDtoFormModel.value));
  }

  private createCustomerDtoFormGroup() {
    return new FormGroup({
      customerId: new FormControl(),
      companyName: new FormControl(),
      contactName: new FormControl(),
      contactTitle: new FormControl(),
      address: new FormGroup({
        street: new FormControl(),
        city: new FormControl(),
        region: new FormControl(),
        postalCode: new FormControl(),
        country: new FormControl(),
        phone: new FormControl(),
      }),
    });
  }

  public clickButton2(): void {
    this.ngSubmitCustomerDto();
    this.newAccountDialog?.toggle();
    this.grid_Page_Index = parseFloat('0');
  }
}
