import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsForUserListComponent } from './requests-for-user-list.component';

describe('RequestsForUserListComponent', () => {
  let component: RequestsForUserListComponent;
  let fixture: ComponentFixture<RequestsForUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestsForUserListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestsForUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
