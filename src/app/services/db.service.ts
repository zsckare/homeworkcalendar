import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import {Profesor} from './profesor';

@Injectable({
  providedIn: 'root'
})

export class DbService {
  private storage: SQLiteObject;
  profesorList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform, 
    private sqlite: SQLite, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'positronx_db.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
      });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }
 
  fetchProfesor(): Observable<Profesor[]> {
    return this.profesorList.asObservable();
  }

    // Render fake data
    getFakeData() {
      this.httpClient.get(
        'assets/dump.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            this.getProfesores();
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }

  // Get list
  getProfesores(){
    return this.storage.executeSql('SELECT * FROM profesortable', []).then(res => {
      let items: Profesor[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            name: res.rows.item(i).name,  
            phone: res.rows.item(i).phone,
            email: res.rows.item(i).email,
           });
        }
      }
      this.profesorList.next(items);
    });
  }

  // Add
  addProfesor(name, phone, email) {
    let data = [name, phone,email];
    return this.storage.executeSql('INSERT INTO profesortable (name, phone,email) VALUES (?, ?,?)', data)
    .then(res => {
      this.getProfesores();
    });
  }
 
}
