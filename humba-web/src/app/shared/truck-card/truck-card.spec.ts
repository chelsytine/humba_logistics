import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckCard } from './truck-card';

describe('TruckCard', () => {
  let component: TruckCard;
  let fixture: ComponentFixture<TruckCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TruckCard],
    }).compileComponents();

    fixture = TestBed.createComponent(TruckCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
