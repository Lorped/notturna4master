import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiableriePage } from './diablerie.page';

describe('DiableriePage', () => {
  let component: DiableriePage;
  let fixture: ComponentFixture<DiableriePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DiableriePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
