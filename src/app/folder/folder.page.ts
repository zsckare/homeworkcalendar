import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from './../services/db.service';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  tareas: any;
  constructor(private db: DbService,private activatedRoute: ActivatedRoute) { }

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

  goToAddTarea(){
    alert()
  }

}
