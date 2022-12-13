import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummieLoginComponent } from './dummie-login.component';

describe('DummieLoginComponent', () => {
  let component: DummieLoginComponent;
  let fixture: ComponentFixture<DummieLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DummieLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DummieLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
