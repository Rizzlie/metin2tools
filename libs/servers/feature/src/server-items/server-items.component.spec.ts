import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServerItemsComponent } from './server-items.component';

describe('ServerItemsComponent', () => {
  let component: ServerItemsComponent;
  let fixture: ComponentFixture<ServerItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerItemsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServerItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
