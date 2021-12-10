import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { FileServiceService } from '../app/shared/services/file-service.service';

describe('FileServiceService', () => {
  let service: FileServiceService;
  let mockHttp = {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide:HttpClient, useValue:mockHttp}]
    });
    service = TestBed.inject(FileServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
