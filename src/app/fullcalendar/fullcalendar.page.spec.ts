import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FullcalendarPage } from './fullcalendar.page';

describe('FullcalendarPage', () => {
  let component: FullcalendarPage;
  let fixture: ComponentFixture<FullcalendarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FullcalendarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
