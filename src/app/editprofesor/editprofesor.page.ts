import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { DbService } from './../services/db.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-editprofesor',
  templateUrl: './editprofesor.page.html',
  styleUrls: ['./editprofesor.page.scss'],
})
export class EditprofesorPage implements OnInit {

  name: string;
  phone: string;
  email: string;
  data: any;
  id:0;
  constructor(
    public navCtrl: NavController,
    private db: DbService,
    private route: ActivatedRoute, 
    private router: Router
    ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = JSON.parse(this.router.getCurrentNavigation().extras.state.special);
        
        console.log(this.data)
        this.name = this.data.name
        this.phone = this.data.phone
        this.email = this.data.email
        this.id = this.data.id
        console.log("CARGADO")
        console.log(this.data)
      }
    });
  }
  saveProfesor(){
    this.db.editProfesor(this.id,this.name,this.phone,this.email).then((res)=>{  
      this.db.getProfesores()  
      this.navCtrl.pop()
    })    
  }
}
