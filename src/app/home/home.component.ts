import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IGX_CHIPS_DIRECTIVES, IGX_GRID_DIRECTIVES, IGX_LIST_DIRECTIVES, IgxAvatarComponent, IgxIconComponent } from '@infragistics/igniteui-angular';
import { IgxCategoryChartModule } from 'igniteui-angular-charts';
import { Subject, takeUntil } from 'rxjs';
import { SalesType } from '../models/financial/sales-type';
import { CustomerDto } from '../models/northwind-swagger/customer-dto';
import { MeetingsTasksType } from '../models/crmapp-data/meetings-tasks-type';
import { FinancialService } from '../services/financial.service';
import { NorthwindSwaggerService } from '../services/northwind-swagger.service';
import { CRMAppDataService } from '../services/crmapp-data.service';

@Component({
  selector: 'app-home',
  imports: [IGX_CHIPS_DIRECTIVES, IGX_GRID_DIRECTIVES, IGX_LIST_DIRECTIVES, IgxCategoryChartModule, IgxAvatarComponent, IgxIconComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public financialSales: SalesType[] = [];
  public northwindSwaggerCustomerDto: CustomerDto[] = [];
  public cRMAppDataMeetingsTasks: MeetingsTasksType[] = [];

  constructor(
    private financialService: FinancialService,
    private northwindSwaggerService: NorthwindSwaggerService,
    private cRMAppDataService: CRMAppDataService,
  ) {}


  ngOnInit() {
    this.financialService.getSales().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.financialSales = data
    );
    this.northwindSwaggerService.getCustomerDtoList().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.northwindSwaggerCustomerDto = data
    );
    this.cRMAppDataService.getMeetingsTasksList().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.cRMAppDataMeetingsTasks = data
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
