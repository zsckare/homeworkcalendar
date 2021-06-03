import { Component, OnInit } from '@angular/core';
import { DbService } from './../services/db.service';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-addmateria',
  templateUrl: './addmateria.page.html',
  styleUrls: ['./addmateria.page.scss'],
})
export class AddmateriaPage implements OnInit {
  title:string;
  name:'';
  profesor:'';
  profesores:any[]=[];
  action:string;
  data:any;
  add = 0;
  constructor(private db: DbService,public alertController: AlertController,private router: Router,private route: ActivatedRoute, public navCtrl: NavController,) { }

  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchProfesor().subscribe(item => {
          this.profesores = item          
          console.log(this.profesores)          
        })
      }
    }); 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = JSON.parse(this.router.getCurrentNavigation().extras.state.special);
        
        console.log("CARGO EDIT")
        this.add = 1
        this.name = this.data.name
        this.profesor = this.data.profesor
      }
    });

    if(this.add ==0){
      this.title = "Agregar Asignatura";
      this.action = "Guardar"
    }else{
      this.title = "Editar Asignatura";
      this.action = "Guardar"
    }
  }

  setAction(){
    if(this.add ==0){
     this.saveMateria();
    }else{
      this.editMateria();
    }
  }

  saveMateria(){
    this.db.addMateria(this.name,this.profesor).then((res)=>{
      this.db.getMaterias().then((res)=>{
        this.navCtrl.pop()
      })
    })
  }
  editMateria(){
    this.db.editMateria(this.data.id,this.name,this.profesor).then((res)=>{
      this.db.getMaterias().then((res)=>{
        this.navCtrl.pop()
      })
    })
  }
}
