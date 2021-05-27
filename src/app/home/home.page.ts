import { Component, OnInit } from '@angular/core';
import { DbService } from './../services/db.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private db: DbService,) { }

  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchProfesor().subscribe(item => {      
          console.log(item)
        })
      }
    });     
  }

}
