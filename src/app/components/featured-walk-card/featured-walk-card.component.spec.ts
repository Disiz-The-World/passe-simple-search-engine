import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedWalkCardComponent } from './featured-walk-card.component';

describe('FeaturedWalkCardComponent', () => {
  let component: FeaturedWalkCardComponent;
  let fixture: ComponentFixture<FeaturedWalkCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedWalkCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedWalkCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
