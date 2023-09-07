import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestForClientComponent } from './request-for-client.component';

describe('RequestForClientComponent', () => {
  let component: RequestForClientComponent;
  let fixture: ComponentFixture<RequestForClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestForClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestForClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
