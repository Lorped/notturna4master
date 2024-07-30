import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditcondPage } from './editcond.page';

describe('EditcondPage', () => {
  let component: EditcondPage;
  let fixture: ComponentFixture<EditcondPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcondPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
