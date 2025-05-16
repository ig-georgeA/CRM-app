import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IgxAvatarComponent, IgxIconComponent, IgxButtonDirective, IgxRippleDirective, IGX_SELECT_DIRECTIVES, IGX_INPUT_GROUP_DIRECTIVES, IGX_GRID_DIRECTIVES, IgxPaginatorComponent, IGX_GRID_ACTION_STRIP_DIRECTIVES, IGX_DIALOG_DIRECTIVES, IgxSnackbarComponent } from '@infragistics/igniteui-angular';
import { AccountsComponent } from './accounts.component';

describe('AccountsComponent', () => {
  let component: AccountsComponent;
  let fixture: ComponentFixture<AccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountsComponent, NoopAnimationsModule, FormsModule, RouterTestingModule, HttpClientTestingModule, IgxAvatarComponent, IgxIconComponent, IgxButtonDirective, IgxRippleDirective, IGX_SELECT_DIRECTIVES, IGX_INPUT_GROUP_DIRECTIVES, IGX_GRID_DIRECTIVES, IgxPaginatorComponent, IGX_GRID_ACTION_STRIP_DIRECTIVES, IGX_DIALOG_DIRECTIVES, IgxSnackbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
