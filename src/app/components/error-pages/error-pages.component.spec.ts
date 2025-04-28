import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPagesComponent } from './error-pages.component';

describe('ErrorPagesComponent', () => {
  let component: ErrorPagesComponent;
  let fixture: ComponentFixture<ErrorPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorPagesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
