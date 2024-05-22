import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DungeonsFeatureComponent } from './dungeons-feature.component';

describe('DungeonsFeatureComponent', () => {
  let component: DungeonsFeatureComponent;
  let fixture: ComponentFixture<DungeonsFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DungeonsFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DungeonsFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
