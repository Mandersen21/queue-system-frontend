import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueRowComponent } from './queue-row.component';

describe('QueueRowComponent', () => {
  let component: QueueRowComponent;
  let fixture: ComponentFixture<QueueRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueueRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
