import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IGX_ACCORDION_DIRECTIVES, IGX_CHIPS_DIRECTIVES, IGX_EXPANSION_PANEL_DIRECTIVES, IGX_GRID_DIRECTIVES, IGX_LIST_DIRECTIVES, IGX_TABS_DIRECTIVES, IgxAvatarComponent, IgxButtonDirective, IgxCheckboxComponent, IgxIconComponent, IgxRippleDirective } from '@infragistics/igniteui-angular';
import { Subject, take, takeUntil } from 'rxjs';
import { OrderDto } from '../models/northwind-swagger/order-dto';
import { CustomerDto } from '../models/northwind-swagger/customer-dto';
import { ProductDto } from '../models/northwind-swagger/product-dto';
import { NorthwindSwaggerService } from '../services/northwind-swagger.service';

@Component({
  selector: 'app-account-detail',
  imports: [IGX_EXPANSION_PANEL_DIRECTIVES, IGX_ACCORDION_DIRECTIVES, IGX_CHIPS_DIRECTIVES, IGX_TABS_DIRECTIVES, IGX_GRID_DIRECTIVES, IGX_LIST_DIRECTIVES, IgxButtonDirective, IgxRippleDirective, IgxIconComponent, IgxAvatarComponent, IgxCheckboxComponent, RouterLink],
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  private _rCustomerID: string = 'AROUT';
  @Input()
  public get rCustomerID(): string {
    return this._rCustomerID ?? 'AROUT';
  }
  public set rCustomerID(value: string) {
    this._rCustomerID = value;
    this.selectedCustomer1$.next();
    this.northwindSwaggerOrderDto$.next();
  }

  private _selectedCustomer1?: CustomerDto;
  public get selectedCustomer1(): CustomerDto | undefined {
    return this._selectedCustomer1;
  }
  public set selectedCustomer1(value: CustomerDto | undefined) {
    this._selectedCustomer1 = value;
    this.selectedOrder = undefined;
  }
  public selectedCustomer1$: Subject<void> = new Subject<void>();


  private _selectedOrder?: OrderDto;
  public get selectedOrder(): OrderDto | undefined {
    return this._selectedOrder;
  }
  public set selectedOrder(value: OrderDto | undefined) {
    this._selectedOrder = value;
    this.northwindSwaggerProductDto$.next();
  }
  public northwindSwaggerOrderDto: OrderDto[] = [];
  public northwindSwaggerOrderDto$: Subject<void> = new Subject<void>();

  public northwindSwaggerProductDto: ProductDto[] = [];
  public northwindSwaggerProductDto$: Subject<void> = new Subject<void>();

  constructor(
    private northwindSwaggerService: NorthwindSwaggerService,
  ) {}


  ngOnInit() {
    this.northwindSwaggerService.getCustomerDto(this.rCustomerID).pipe(takeUntil(this.destroy$)).subscribe(
      data => this.selectedCustomer1 = data
    );
    this.selectedCustomer1$.pipe(takeUntil(this.destroy$)).subscribe(
      () => { this.northwindSwaggerService.getCustomerDto(this.rCustomerID).pipe(take(1)).subscribe(
        data => this.selectedCustomer1 = data
    )});
    this.northwindSwaggerService.getOrderDtoList(this.rCustomerID).pipe(takeUntil(this.destroy$)).subscribe(
      data => this.northwindSwaggerOrderDto = data
    );
    this.northwindSwaggerOrderDto$.pipe(takeUntil(this.destroy$)).subscribe(
      () => { this.northwindSwaggerService.getOrderDtoList(this.rCustomerID).pipe(take(1)).subscribe(
        data => this.northwindSwaggerOrderDto = data
    )});
    this.northwindSwaggerService.getProductDtoList(this.selectedOrder?.orderId as any).pipe(takeUntil(this.destroy$)).subscribe(
      data => this.northwindSwaggerProductDto = data
    );
    this.northwindSwaggerProductDto$.pipe(takeUntil(this.destroy$)).subscribe(
      () => { this.northwindSwaggerService.getProductDtoList(this.selectedOrder?.orderId as any).pipe(take(1)).subscribe(
        data => this.northwindSwaggerProductDto = data
    )});
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.selectedCustomer1$.complete();
    this.northwindSwaggerOrderDto$.complete();
    this.northwindSwaggerProductDto$.complete();
  }
}
