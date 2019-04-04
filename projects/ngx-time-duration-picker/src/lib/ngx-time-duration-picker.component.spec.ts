import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTimeDurationPickerComponent } from './ngx-time-duration-picker.component';

describe('NgxTimeDurationPickerComponent', () => {
  let component: NgxTimeDurationPickerComponent;
  let fixture: ComponentFixture<NgxTimeDurationPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxTimeDurationPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxTimeDurationPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
