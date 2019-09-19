import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KkmodalboxComponent } from './kkmodalbox.component';

describe('KkmodalboxComponent', () => {
  let component: KkmodalboxComponent;
  let fixture: ComponentFixture<KkmodalboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KkmodalboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KkmodalboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
