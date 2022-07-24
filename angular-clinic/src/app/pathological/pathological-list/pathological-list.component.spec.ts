import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathologicalListComponent } from './pathological-list.component';

describe('PathologicalListComponent', () => {
  let component: PathologicalListComponent;
  let fixture: ComponentFixture<PathologicalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathologicalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathologicalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
