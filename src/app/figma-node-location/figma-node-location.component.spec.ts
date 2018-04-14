import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FigmaNodeLocationComponent } from './figma-node-location.component';

describe('FigmaNodeLocationComponent', () => {
  let component: FigmaNodeLocationComponent;
  let fixture: ComponentFixture<FigmaNodeLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FigmaNodeLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FigmaNodeLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
