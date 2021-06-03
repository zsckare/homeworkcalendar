import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'profesor',
    loadChildren: () => import('./profesor/profesor.module').then( m => m.ProfesorPageModule)
  },
  {
    path: 'addprofesor',
    loadChildren: () => import('./addprofesor/addprofesor.module').then( m => m.AddprofesorPageModule)
  },
  {
    path: 'materia',
    loadChildren: () => import('./materia/materia.module').then( m => m.MateriaPageModule)
  },
  {
    path: 'addmateria',
    loadChildren: () => import('./addmateria/addmateria.module').then( m => m.AddmateriaPageModule)
  },
  {
    path: 'addtarea',
    loadChildren: () => import('./addtarea/addtarea.module').then( m => m.AddtareaPageModule)
  },
  {
    path: 'editprofesor',
    loadChildren: () => import('./editprofesor/editprofesor.module').then( m => m.EditprofesorPageModule)
  },
  {
    path: 'ver-tarea',
    loadChildren: () => import('./ver-tarea/ver-tarea.module').then( m => m.VerTareaPageModule)
  },
  {
    path: 'addexamen',
    loadChildren: () => import('./addexamen/addexamen.module').then( m => m.AddexamenPageModule)
  },
  {
    path: 'edit-todo',
    loadChildren: () => import('./edit-todo/edit-todo.module').then( m => m.EditTodoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
