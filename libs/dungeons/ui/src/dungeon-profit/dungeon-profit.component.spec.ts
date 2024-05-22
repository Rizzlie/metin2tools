import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DungeonProfitComponent } from './dungeon-profit.component';

describe('DungeonProfitComponent', () => {
  let component: DungeonProfitComponent;
  let fixture: ComponentFixture<DungeonProfitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DungeonProfitComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DungeonProfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
