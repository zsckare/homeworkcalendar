import { Component, OnInit } from '@angular/core';
import { DbService } from './../services/db.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-addtarea',
  templateUrl: './addtarea.page.html',
  styleUrls: ['./addtarea.page.scss'],
})
export class AddtareaPage implements OnInit {
  materias: any[] = []
  title: '';
  materia: '';


  constructor(
    private db: DbService,
    public navCtrl: NavController,
  ) {

     }

  ngOnInit() {

    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchMaterias().subscribe(item => {
          this.materias = item                         
        })
      }
    });     
  }

  addImagen(){

  }

  saveTarea(){
    this.navCtrl.pop()
  }
}
