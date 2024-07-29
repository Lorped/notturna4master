import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SendmessaggioPage } from './sendmessaggio.page';

describe('SendmessaggioPage', () => {
  let component: SendmessaggioPage;
  let fixture: ComponentFixture<SendmessaggioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SendmessaggioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
