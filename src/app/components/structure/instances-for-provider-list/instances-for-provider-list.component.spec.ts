import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstancesForProviderListComponent } from './instances-for-provider-list.component';

describe('InstancesForProviderListComponent', () => {
  let component: InstancesForProviderListComponent;
  let fixture: ComponentFixture<InstancesForProviderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstancesForProviderListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstancesForProviderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
