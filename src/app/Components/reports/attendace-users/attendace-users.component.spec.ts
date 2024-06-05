import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendaceUsersComponent } from './attendace-users.component';

describe('AttendaceUsersComponent', () => {
  let component: AttendaceUsersComponent;
  let fixture: ComponentFixture<AttendaceUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendaceUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendaceUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
