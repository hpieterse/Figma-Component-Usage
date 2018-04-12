import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentAnalysisComponent } from './component-analysis.component';

describe('ComponentAnalysisComponent', () => {
  let component: ComponentAnalysisComponent;
  let fixture: ComponentFixture<ComponentAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
