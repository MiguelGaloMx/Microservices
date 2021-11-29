import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BooksService } from '../services/books.service';
import { Books } from '../shared/model/books.model';
import { NewBookComponent } from './new-book/new-book.component';
import { Subscription } from 'rxjs';
import { pagination } from '../shared/model/pagination.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {
  bookData: Books[] = [];
  displayedColumns = ["titulo", "nombreCompleto", "descripcion", "precio"];
  dataSource = new MatTableDataSource<Books>();

  @ViewChild(MatSort) order!: MatSort;
  @ViewChild(MatPaginator) pagin!: MatPaginator;

  private bookSubscription!: Subscription;

  totalBooks = 0;
  booksPerPage = 5;
  pageCombo = [5, 10, 25];
  currentPage = 1;
  sort = 'titulo';
  sortDirection = 'asc';
  filterValue!: any;
  timeout: any = null;

  constructor(private booksService: BooksService,
    private dialog: MatDialog) {

  }

  orderBy(event: any): void {
    this.sort = event.active;
    this.sortDirection = event.direction;
    this.getBooks();
  }

  pageEvent(event: PageEvent): void {
    this.booksPerPage = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.getBooks();
  }

  filter(event: any): void {
    clearTimeout(this.timeout);
    const $this = this;
    this.timeout = setTimeout(() => {
      if (event.keyCode != 13) {
        const filterValue = {
          propiedad: 'titulo',
          valor: event.target?.value
        };

        $this.filterValue = filterValue;
        $this.getBooks();
      }
    }, 1000);
    //this.dataSource.filter = event.target?.value;
  }

  showDialog(): void {
    const dialogRef = this.dialog.open(NewBookComponent, {
      width: '550px'
    });

    dialogRef.afterClosed()
      .subscribe(() => {
        this.getBooks();
      });
  }

  getBooks(): void {
    this.booksService.getBooks(this.booksPerPage, this.currentPage, this.sort, this.sortDirection, this.filterValue);
  }

  ngOnInit(): void {
    this.getBooks();
    this.bookSubscription = this.booksService.getBooksListener()
      .subscribe((paginBooks: pagination<Books[]>) => {
        this.dataSource = new MatTableDataSource<Books>(paginBooks.data);
        this.totalBooks = paginBooks.totalRows;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.order;
    this.dataSource.paginator = this.pagin;
  }

  ngOnDestroy(): void {
    this.bookSubscription.unsubscribe();
  }

}
