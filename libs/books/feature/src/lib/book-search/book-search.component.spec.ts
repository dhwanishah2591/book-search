import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { Store } from '@ngrx/store';

describe('BookSearchComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let store: Store;
  let storeDispatchSpy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jest.spyOn(component, 'searchBooks');
    store = TestBed.inject(Store);
    storeDispatchSpy = jest.spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should not call searchBooks after 500ms for same input', fakeAsync(() => {
    component.searchForm.controls['term'].setValue('javascript');
    tick(500);
    component.searchForm.controls['term'].setValue('javascript');
    tick(500);
    expect(component.searchBooks).toHaveBeenCalledTimes(1);
    expect(storeDispatchSpy).toHaveBeenCalledTimes(1);
  }));

  it('should call searchBooks after 500ms for diffrent input', fakeAsync(() => {
    component.searchForm.controls['term'].setValue('javascript');
    tick(500);
    component.searchForm.controls['term'].setValue('html');
    tick(500);
    expect(component.searchBooks).toHaveBeenCalledTimes(2);
    expect(storeDispatchSpy).toHaveBeenCalledTimes(2);
  }));

  it('should not subscribe to input when component destroyed', fakeAsync(() => {
    component.ngOnDestroy();
    component.searchForm.controls['term'].setValue('java');
    tick(500);
    expect(component.searchBooks).not.toHaveBeenCalled();
  }));
});
