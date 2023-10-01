import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrivateView } from './private.view';

describe('PrivateView', () => {
  let component: PrivateView;
  let fixture: ComponentFixture<PrivateView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateView],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivateView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
