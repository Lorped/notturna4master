import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaoggettiPage } from './listaoggetti.page';

describe('ListaoggettiPage', () => {
  let component: ListaoggettiPage;
  let fixture: ComponentFixture<ListaoggettiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaoggettiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
