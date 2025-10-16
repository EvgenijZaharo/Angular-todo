import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenModal } from './open-modal';

describe('OpenModal', () => {
  let component: OpenModal;
  let fixture: ComponentFixture<OpenModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
