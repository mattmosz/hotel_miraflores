import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HabitacionesPage } from './habitaciones.page';

describe('HabitacionesPage', () => {
  let component: HabitacionesPage;
  let fixture: ComponentFixture<HabitacionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
