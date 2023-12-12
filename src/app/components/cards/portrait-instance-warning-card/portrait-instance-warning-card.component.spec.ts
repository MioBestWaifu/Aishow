import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortraitInstanceWarningCardComponent } from './portrait-instance-warning-card.component';

describe('PortraitInstanceWarningCardComponent', () => {
  let component: PortraitInstanceWarningCardComponent;
  let fixture: ComponentFixture<PortraitInstanceWarningCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortraitInstanceWarningCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortraitInstanceWarningCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
