import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServersFeatureComponent } from './servers-feature.component';

describe('ServersFeatureComponent', () => {
  let component: ServersFeatureComponent;
  let fixture: ComponentFixture<ServersFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServersFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServersFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
