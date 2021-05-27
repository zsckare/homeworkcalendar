import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DbService } from './../services/db.service';
@Component({
  selector: 'app-addprofesor',
  templateUrl: './addprofesor.page.html',
  styleUrls: ['./addprofesor.page.scss'],
})
export class AddprofesorPage implements OnInit {


  name: string;
  phone: string;
  email: string;

  constructor(
    public navCtrl: NavController,
    private db: DbService,
    ) { }

  ngOnInit() {
  }


  saveProfesor(){

    this.db.addProfesor(this.name,this.phone,this.email).then((res)=>{    
      this.navCtrl.pop()
    })

    
  }
}
