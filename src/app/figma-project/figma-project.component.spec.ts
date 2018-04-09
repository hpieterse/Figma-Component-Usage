import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FigmaProjectComponent } from './figma-project.component';

describe('FigmaProjectComponent', () => {
  let component: FigmaProjectComponent;
  let fixture: ComponentFixture<FigmaProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FigmaProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FigmaProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
