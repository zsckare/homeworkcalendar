import { Component, OnInit } from '@angular/core';
import { DbService } from './../services/db.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.page.html',
  styleUrls: ['./edit-todo.page.scss'],
})
export class EditTodoPage implements OnInit {
  materias: any[] = []
  title: '';
  materia: '';
  foto: string;
  fecha:'';
  notas:'';
  data: any;

  tituloPagina:string;
  constructor(private db: DbService,public navCtrl: NavController,private camera: Camera,private route: ActivatedRoute, private router: Router) {  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = JSON.parse(this.router.getCurrentNavigation().extras.state.special);
        this.title = this.data.title
        this.materia = this.data.materia
        this.foto = this.data.foto
        this.fecha = this.data.fecha
        this.notas = this.data.notas
        if(this.data.tipoTodo==1){
          this.tituloPagina = "Editar Tarea"
        }else{
          this.tituloPagina = "Editar Examen"
        }
      }
    });
    
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
    if(this.data.tipoTodo == 1){
      //Editar tarea
      this.db.updateTarea(this.data.id,this.title,this.materia,this.fecha,this.notas,this.foto).then((res)=>{
        this.db.getTareas().then((res)=>{
          this.navCtrl.pop()
        })
      })
    }else{
      this.db.updateExamen(this.data.id,this.title,this.materia,this.fecha,this.notas).then((res)=>{
        this.db.getTareas().then((res)=>{
          this.navCtrl.pop()
        })
      })
    }
    
  }
}
