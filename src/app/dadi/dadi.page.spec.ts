import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular';
import { DadiPage } from './dadi.page';

describe('DadiPage', () => {
  let component: DadiPage;
  let fixture: ComponentFixture<DadiPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideIonicAngular(), provideRouter([]), provideHttpClient()],
    });
    fixture = TestBed.createComponent(DadiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
