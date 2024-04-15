import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaPregutasComponent } from './zona-pregutas.component';

describe('ZonaPregutasComponent', () => {
  let component: ZonaPregutasComponent;
  let fixture: ComponentFixture<ZonaPregutasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZonaPregutasComponent]
    });
    fixture = TestBed.createComponent(ZonaPregutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
