import { Component, OnInit } from '@angular/core';
import { DbService } from './../services/db.service';

import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-materia',
  templateUrl: './materia.page.html',
  styleUrls: ['./materia.page.scss'],
})
export class MateriaPage implements OnInit {
  materias: any[] = []

  

  constructor(private db: DbService,public alertController: AlertController,private router: Router,) { }

  ngOnInit() {

    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchMaterias().subscribe(item => {
          this.materias = item                         
        })
      }
    });     
  }

  editarMateria(data){
    let navigationExtras: NavigationExtras = {
      state: {
        special: JSON.stringify(data)
      }
    };
    console.log(navigationExtras)
    this.router.navigate(['addmateria'], navigationExtras);
  }


  async alertDelete(id){
    const alert = await this.alertController.create({
      
      message: '¿Eliminar Materia?',
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
            this.deleteMateria(id)
          }
        }
      ]
    });

    await alert.present();
  }

  deleteMateria(id){
    this.db.deleteRegistro("materiatable",id).then((res)=>{
      this.db.getMaterias().then((res)=>{
        this.db.fetchMaterias().subscribe(item => {
          this.materias = item          
               
        })
      })
    })
  }



}
