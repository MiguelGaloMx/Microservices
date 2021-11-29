import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { BooksService } from '../../services/books.service';
import { Autor } from '../../shared/model/autor.model';
import { AutorService } from '../../services/autor.service';
import { Subscription } from 'rxjs';
import { Books } from '../../shared/model/books.model';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit, OnDestroy {
  selectAutor!: string;
  selectAutorText!: string;
  publishDate!: string;

  private autorSubscription!: Subscription;
  private bookSubscription!: Subscription;

  autors: Autor[] = [];

  @ViewChild(MatDatepicker) picker!: MatDatepicker<Date>;

  constructor(private bookService: BooksService,
    private dialogRef: MatDialog,
    private autorService: AutorService) {

  }

  selected(event: MatSelectChange) {
    this.selectAutorText = (event.source.selected as MatOption).viewValue;
  }

  saveBook(form: NgForm) {
    if (form.valid) {
      const autorRequest = {
        id: this.selectAutor,
        nombreCompleto: this.selectAutorText
      };

      const bookReuqest: Books = {
        id: '',
        descripcion: form.value.descripcion,
        titulo: form.value.titulo,
        autor: autorRequest,
        precio: parseInt(form.value.precio),
        fechaPublicacion: new Date(this.publishDate)
      }

      console.log(bookReuqest);

      this.bookService.setBook(bookReuqest);
      this.bookSubscription = this.bookService.setBookListener()
        .subscribe(() => {
          this.dialogRef.closeAll();
        });
    }
  }

  ngOnInit(): void {
    //this.autors = this.autorService.getAutors();
    this.autorService.getAutors();
    this.autorSubscription = this.autorService.getAutorsListener()
      .subscribe((autors: Autor[]) => {
        this.autors = autors;
      });
  }

  ngOnDestroy(): void {
    this.autorSubscription.unsubscribe();
    this.bookSubscription.unsubscribe();
  }
}
