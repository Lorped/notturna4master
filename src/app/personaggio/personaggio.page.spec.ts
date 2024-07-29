import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonaggioPage } from './personaggio.page';

describe('PersonaggioPage', () => {
  let component: PersonaggioPage;
  let fixture: ComponentFixture<PersonaggioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaggioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
