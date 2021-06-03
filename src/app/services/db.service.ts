import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import {Profesor} from './profesor';
import { Materia } from './materia';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})

export class DbService {
  private storage: SQLiteObject;
  profesorList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  materiasList = new BehaviorSubject([]);
  tareasList = new BehaviorSubject([]);

  constructor(
    private platform: Platform, 
    private sqlite: SQLite, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'homeworkcalendar.db',
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

  fetchMaterias(): Observable<Profesor[]> {
    return this.materiasList.asObservable();
  }
  fetchTareas(): Observable<Profesor[]> {
    return this.tareasList.asObservable();
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
            this.getMaterias();
            this.getTareas();
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
  editProfesor(id,name, phone, email) {
    let data = [name, phone,email];
    return this.storage.executeSql(`UPDATE profesortable SET name = ?, phone = ? ,email= ? WHERE id = ${id}`, data)
    .then(res => {
      this.getProfesores();
    });
  }

  //---Tareas-----
  
  addTarea(title,materia,fecha,tipoTodo,notas,foto) {
    let data = [title,materia,fecha,tipoTodo,notas,foto,1];
    return this.storage.executeSql('INSERT INTO todotable (title,materia,fecha,tipoTodo,notas,foto,hecha) VALUES (?, ?,?,?,?,?,?)', data)
    .then(res => {
      this.getTareas();
    });
  }
  getTareas(){
    return this.storage.executeSql('SELECT * FROM todotable', []).then(res => {
      let items: Todo[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            title: res.rows.item(i).title,  
            materia: res.rows.item(i).materia,
            fecha: res.rows.item(i).fecha,  
            tipoTodo: res.rows.item(i).tipoTodo,   
            notas: res.rows.item(i).notas,  
            foto: res.rows.item(i).foto,  
           });
        }
      }
      this.tareasList.next(items);
    });
  }

  setTareaHecha(id,value){
    let data = [value];
    return this.storage.executeSql(`UPDATE todotable SET hecha = ? WHERE id = ${id}`, data)
    .then(res => {
      this.getTareas();
    });
  }

  //--Fin Tareas

  // Materias
  getMaterias(){
    return this.storage.executeSql('SELECT * FROM materiatable', []).then(res => {
      let items: Materia[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            name: res.rows.item(i).name,  
            profesor: res.rows.item(i).profesor,
           });
        }
      }
      this.materiasList.next(items);
    });
  }

  addMateria(name, profesor){
    let data = [name,profesor];
    return this.storage.executeSql('INSERT INTO materiatable (name,profesor) VALUES (?, ?)', data)
    .then(res => {
      this.getMaterias();
    });
  }
  editMateria(id,name,profesor){
    let data = [name, profesor];
    return this.storage.executeSql(`UPDATE materiatable SET name = ?, profesor = ?  WHERE id = ${id}`, data)
    .then(res => {
      this.getMaterias();
    });
  }


  deleteRegistro(tablename, id){

    return this.storage.executeSql(`DELETE FROM ${tablename} WHERE id = ?`, [id])
    .then(_ => {
      
    });
  }


  //Fin materias
}
