import { Component, OnInit } from '@angular/core';
import { DbService } from './../services/db.service';
import { NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-addtarea',
  templateUrl: './addtarea.page.html',
  styleUrls: ['./addtarea.page.scss'],
})
export class AddtareaPage implements OnInit {
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
    console.log("addtarea")
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchMaterias().subscribe(item => {
          this.materias = item    
          console.log(this.materias)                     
        })
      }
    });     
  }

  addImagen(){
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL
    }
    this.camera.getPicture(options).then((imageData) => {
      this.foto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }

  saveTarea(){
    if(!this.foto){
      this.foto = ""
    }
    this.db.addTarea(this.title,this.materia,this.fecha,1,this.notas,this.foto).then((res)=>{
      
    })
    this.navCtrl.pop()
  }
}
