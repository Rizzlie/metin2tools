import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DungeonItemsComponent } from './dungeon-items.component';

describe('DungeonItemsComponent', () => {
  let component: DungeonItemsComponent;
  let fixture: ComponentFixture<DungeonItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DungeonItemsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DungeonItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
