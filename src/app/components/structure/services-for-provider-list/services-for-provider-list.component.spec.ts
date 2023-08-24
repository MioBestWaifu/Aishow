import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesForProviderListComponent } from './services-for-provider-list.component';

describe('ServicesForProviderListComponent', () => {
  let component: ServicesForProviderListComponent;
  let fixture: ComponentFixture<ServicesForProviderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesForProviderListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesForProviderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
