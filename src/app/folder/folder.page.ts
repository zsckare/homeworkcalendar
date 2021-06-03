import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from './../services/db.service';

import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  tareas: any;
  constructor(private db: DbService,private activatedRoute: ActivatedRoute,public alertController: AlertController,private router: Router) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchTareas().subscribe(item => {      
          console.log(item)
          this.tareas  = item
        })
      }
    });  
  }

  verTarea(item){
    let navigationExtras: NavigationExtras = {
      state: {
        special: JSON.stringify(item)
      }
    };
    console.log(navigationExtras)
    this.router.navigate(['ver-tarea'], navigationExtras);
  }

  goToAddTarea(){
    alert()
  }
  editarTarea(item){
    let navigationExtras: NavigationExtras = {
      state: {
        special: JSON.stringify(item)
      }
    };
    console.log(navigationExtras)
    this.router.navigate(['edit-todo'], navigationExtras);
  }
  
  checarHecha(item){
    if(item.hecha == 1){
      this.db.setTareaHecha(item.id,2).then((res)=>{
        this.db.getTareas().then((res)=>{
          this.db.fetchTareas().subscribe(item => {      
            //console.log(item)
            this.tareas  = item
          })
        })
      })
    }else{
      this.db.setTareaHecha(item.id,1).then((res)=>{
        this.db.getTareas().then((res)=>{
          this.db.fetchTareas().subscribe(item => {      
//            console.log(item)
            this.tareas  = item
          })
        })
      })
    }
  }


  async alertDelete(id){
    const alert = await this.alertController.create({
      
      message: '¿Eliminar tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.eliminarTarea(id)
          }
        }
      ]
    });

    await alert.present();
  }
  eliminarTarea(id){
    this.db.deleteRegistro("todotable",id).then((res)=>{
      this.db.getTareas().then((res)=>{
        this.db.fetchTareas().subscribe(item => {      
          console.log(item)
          this.tareas  = item
        })
      })
    })
  }

}
