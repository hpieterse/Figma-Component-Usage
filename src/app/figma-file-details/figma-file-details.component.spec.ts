import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FigmaFileDetailsComponent } from './figma-file-details.component';

describe('FigmaFileDetailsComponent', () => {
  let component: FigmaFileDetailsComponent;
  let fixture: ComponentFixture<FigmaFileDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FigmaFileDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FigmaFileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
