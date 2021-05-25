import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-addprofesor',
  templateUrl: './addprofesor.page.html',
  styleUrls: ['./addprofesor.page.scss'],
})
export class AddprofesorPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }


  saveProfesor(){


    this.navCtrl.pop()   
  }
}
