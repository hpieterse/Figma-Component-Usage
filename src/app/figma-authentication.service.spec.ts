import { TestBed, inject } from '@angular/core/testing';

import { FigmaAuthenticationService } from './figma-authentication.service';

describe('FigmaAuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FigmaAuthenticationService]
    });
  });

  it('should be created', inject([FigmaAuthenticationService], (service: FigmaAuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
