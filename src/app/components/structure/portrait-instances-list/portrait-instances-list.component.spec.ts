import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortraitInstancesListComponent } from './portrait-instances-list.component';

describe('PortraitInstancesListComponent', () => {
  let component: PortraitInstancesListComponent;
  let fixture: ComponentFixture<PortraitInstancesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortraitInstancesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortraitInstancesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
