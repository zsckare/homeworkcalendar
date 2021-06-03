import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-ver-tarea',
  templateUrl: './ver-tarea.page.html',
  styleUrls: ['./ver-tarea.page.scss'],
})
export class VerTareaPage implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private router: Router
    ) {

  }
  data:any;
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = JSON.parse(this.router.getCurrentNavigation().extras.state.special);
        
        console.log("CARGADO")
        console.log(this.data)
      }
    });
  }

}
