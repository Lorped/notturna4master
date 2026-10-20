import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular';
import { SendmessaggioPage } from './sendmessaggio.page';

describe('SendmessaggioPage', () => {
  let component: SendmessaggioPage;
  let fixture: ComponentFixture<SendmessaggioPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideIonicAngular(), provideRouter([]), provideHttpClient()],
    });
    fixture = TestBed.createComponent(SendmessaggioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
