import { Component, OnInit } from '@angular/core';
import { DbService } from './../services/db.service';
@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {
  profesores: any[] = []
  
  
  constructor(private db: DbService,) { }

  ngOnInit() {

    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchProfesor().subscribe(item => {
          this.profesores = item          
          console.log(this.profesores)          
        })
      }
    });     
  }

}
