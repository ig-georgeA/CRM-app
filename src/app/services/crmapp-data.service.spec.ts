import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CRMAppDataService } from './crmapp-data.service';

describe('CRMAppDataService', () => {
  let service: CRMAppDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(CRMAppDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
