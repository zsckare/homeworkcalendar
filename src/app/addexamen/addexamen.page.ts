import { Component, OnInit } from '@angular/core';
import { DbService } from './../services/db.service';
import { NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-addexamen',
  templateUrl: './addexamen.page.html',
  styleUrls: ['./addexamen.page.scss'],
})
export class AddexamenPage implements OnInit {

  materias: any[] = []
  title: '';
  materia: '';
  foto: any;
  fecha:'';
  notas:'';
  constructor(
    private db: DbService,
    public navCtrl: NavController,
    private camera: Camera
  ) {

     }

  ngOnInit() {

    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchMaterias().subscribe(item => {
          this.materias = item    
          console.log(this.materias)                     
        })
      }
    });     
  }

  

  saveTarea(){
    if(!this.foto){
      this.foto = ""
    }
    this.db.addTarea(this.title,this.materia,this.fecha,2,this.notas,"").then((res)=>{
      this.db.getTareas().then((res)=>{
        this.db.fetchTareas()
        this.navCtrl.pop()
      })
    })
    
  }

}
