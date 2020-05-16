import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssistComponent } from './add-assist.component';

describe('AddAssistComponent', () => {
  let component: AddAssistComponent;
  let fixture: ComponentFixture<AddAssistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
