import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeastComponent } from './add-feast.component';

describe('AddFeastComponent', () => {
  let component: AddFeastComponent;
  let fixture: ComponentFixture<AddFeastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFeastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
