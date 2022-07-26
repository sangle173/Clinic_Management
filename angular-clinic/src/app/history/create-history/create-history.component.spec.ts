import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHistoryComponent } from './create-history.component';

describe('CreateHistoryComponent', () => {
  let component: CreateHistoryComponent;
  let fixture: ComponentFixture<CreateHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
