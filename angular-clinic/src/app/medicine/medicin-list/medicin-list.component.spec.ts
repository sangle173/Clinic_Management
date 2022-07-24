import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinListComponent } from './medicin-list.component';

describe('MedicinListComponent', () => {
  let component: MedicinListComponent;
  let fixture: ComponentFixture<MedicinListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicinListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
