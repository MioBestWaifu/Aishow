import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullServiceCardComponent } from './full-service-card.component';

describe('FullServiceCardComponent', () => {
  let component: FullServiceCardComponent;
  let fixture: ComponentFixture<FullServiceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullServiceCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullServiceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
