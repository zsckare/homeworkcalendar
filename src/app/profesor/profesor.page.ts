import { Component, OnInit } from '@angular/core';
import { DbService } from './../services/db.service';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {
  profesores: any[] = []
  
  
  constructor(private db: DbService,public alertController: AlertController,private router: Router,) { }

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

  editarProfesor(profesor){
let navigationExtras: NavigationExtras = {
      state: {
        special: JSON.stringify(profesor)
      }
    };
    console.log(navigationExtras)
    this.router.navigate(['editprofesor'], navigationExtras);
  }

  async alertDelete(id){
    const alert = await this.alertController.create({
      
      message: '¿Eliminar profesor?',
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
            this.deleteProfessor(id)
          }
        }
      ]
    });

    await alert.present();
  }

  deleteProfessor(id){
    this.db.deleteRegistro("profesortable",id).then((res)=>{
      this.db.getProfesores().then((res)=>{
        this.db.fetchProfesor().subscribe(item => {
          this.profesores = item          
          console.log(this.profesores)          
        })
      })
    })
  }

 

}
