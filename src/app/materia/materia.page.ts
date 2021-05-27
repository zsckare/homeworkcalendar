import { Component, OnInit } from '@angular/core';
import { DbService } from './../services/db.service';
@Component({
  selector: 'app-materia',
  templateUrl: './materia.page.html',
  styleUrls: ['./materia.page.scss'],
})
export class MateriaPage implements OnInit {
  materias: any[] = []

  

  constructor(private db: DbService,) { }

  ngOnInit() {

    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchMaterias().subscribe(item => {
          this.materias = item                         
        })
      }
    });     
  }



}
