import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsForProviderListComponent } from './requests-for-provider-list.component';

describe('RequestsForProviderListComponent', () => {
  let component: RequestsForProviderListComponent;
  let fixture: ComponentFixture<RequestsForProviderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestsForProviderListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestsForProviderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
