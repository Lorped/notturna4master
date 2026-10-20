import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular';
import { PersonaggioPage } from './personaggio.page';

describe('PersonaggioPage', () => {
  let component: PersonaggioPage;
  let fixture: ComponentFixture<PersonaggioPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideIonicAngular(), provideRouter([]), provideHttpClient()],
    });
    fixture = TestBed.createComponent(PersonaggioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
