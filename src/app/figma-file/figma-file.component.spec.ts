import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FigmaFileComponent } from './figma-file.component';

describe('FigmaFileComponent', () => {
  let component: FigmaFileComponent;
  let fixture: ComponentFixture<FigmaFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FigmaFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FigmaFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
