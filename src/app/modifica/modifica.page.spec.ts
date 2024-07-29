import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificaPage } from './modifica.page';

describe('ModificaPage', () => {
  let component: ModificaPage;
  let fixture: ComponentFixture<ModificaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
