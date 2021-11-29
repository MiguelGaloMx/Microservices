import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Autor } from '../shared/model/autor.model';
import { AutorService } from '../services/autor.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent implements OnInit, OnDestroy {
  displayedColumns = ["firstname", "lastname", "degree"];
  dataSource = new MatTableDataSource<Autor>();

  private autorSubscription!: Subscription;

  constructor(private autorService: AutorService) { }

  ngOnInit(): void {
    //this.dataSource.data = this.autorService.getAutors();
    this.autorService.getAutors();
    this.autorSubscription = this.autorService.getAutorsListener()
      .subscribe((autors: Autor[]) => {
        this.dataSource.data = autors;
      });
  }

  ngOnDestroy() {
    this.autorSubscription.unsubscribe();
  }

}
