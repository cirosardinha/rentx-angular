import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalModal } from './rental-modal';

describe('RentalModal', () => {
  let component: RentalModal;
  let fixture: ComponentFixture<RentalModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
