import { TestBed, inject } from '@angular/core/testing';

import { FigmaPlatformService } from './figma-platform.service';

describe('FigmaPlatformService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FigmaPlatformService]
    });
  });

  it('should be created', inject([FigmaPlatformService], (service: FigmaPlatformService) => {
    expect(service).toBeTruthy();
  }));
});
