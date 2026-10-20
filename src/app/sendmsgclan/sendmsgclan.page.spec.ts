import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular';
import { SendmsgclanPage } from './sendmsgclan.page';

describe('SendmsgclanPage', () => {
  let component: SendmsgclanPage;
  let fixture: ComponentFixture<SendmsgclanPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideIonicAngular(), provideRouter([]), provideHttpClient()],
    });
    fixture = TestBed.createComponent(SendmsgclanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
