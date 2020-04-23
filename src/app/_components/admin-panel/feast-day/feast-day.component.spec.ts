import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeastDayComponent } from './feast-day.component';

describe('FeastDayComponent', () => {
  let component: FeastDayComponent;
  let fixture: ComponentFixture<FeastDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeastDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeastDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
