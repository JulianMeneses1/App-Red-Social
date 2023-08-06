// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { EMPTY, of } from 'rxjs';
// import { map, exhaustMap, catchError } from 'rxjs/operators';
// import { ArticlesService } from 'src/app/modules/blog/services/articles.service';
// import Swal from 'sweetalert2';

// // Los efectos se encargan de interactuar con los servicios para así evitar que el componente llame al servicio para obtener la data.
// // De esta forma el componente sólo escucha los cambios en los estados (select) y dispara acciones.
// // El effecto está escuchando todas las acciones y en este caso, cuando se dispara la acción "Load Articles", llama al método getArticles del servicio
// // y si todo sale bien dispara la otra acción de Loaded success, cambiando el estado de isLoading y de articles.
// @Injectable()
// export class ArticlesEffects {

//   loadAllArticles$ = createEffect(() => this.actions$.pipe(
//     ofType('[Blog Page] Load all articles'),
//     exhaustMap(({page}) => this.articlesService.getAllArticles(page)
//       .pipe(
//         map(data => { 
//           return { type: '[Blog Page] Loaded all articles success', articles: data.docs }
//         }),
//         catchError(() => EMPTY)
//       ))
//     )
//   );

//   loadArticlesByCategory$ = createEffect(() => this.actions$.pipe(
//     ofType('[Blog Page] Load articles by category'),
//     exhaustMap(({category, page }) => this.articlesService.getArticlesByCategory(category,page)
//       .pipe(
//         map(data => { 
//          return { type: '[Blog Page] Loaded articles by category success', articles: data.docs, category }
//         }),
//         catchError(() => EMPTY)
//       ))
//     )
//   );

//   loadArticlesBySearcher$ = createEffect(() => this.actions$.pipe(
//     ofType('[Blog Page] Load articles by searcher'),
//     exhaustMap(({search}) => this.articlesService.getArticlesBySearcher(search)
//       .pipe(
//         map(data => {           
//           return { type: '[Blog Page] Loaded articles by searcher success', articles: data.docs }
//         }),
//         catchError(() => {
//             return of({ type: '[Blog Page] Loaded articles by searcher success', articles: [] })
//         })
//       ))
//     )
//   );  

//   onAddArticle$ = createEffect(()=> this.actions$.pipe(
//     ofType('[Create Article Page] On add article'),
//     exhaustMap(({article}) => this.articlesService.addArticle(article)
//       .pipe(
//         map(data => {
//           this.router.navigate(['/blog']);
//           Swal.fire(
//             'Artículo Creado',                
//             'El artículo '+ data.title +' ha sido creado exitosamente',
//             'success'
//         );
//           return { type: '[Create Article Page] Add article', article: data }
//         }),
//         catchError(()=>{
//           Swal.fire(
//             'Error Creación Artículo',                
//             'El título ingresado ya existe',
//             'error'
//         );
//           return of({ type: '[All Pages] Finish loading' })
//         })
//       ))
//   ));

//   onRemoveArticle$ = createEffect(()=> this.actions$.pipe(
//     ofType('[Blog Page] On remove article'),
//     exhaustMap(({id}) => this.articlesService.deleteArticle(id)
//       .pipe(
//         map(data => {
//           Swal.fire( 
//             'Artículo Eliminado',               
//             'El artículo '+ data.title +' ha sido eliminado exitosamente',
//             'success'
//         );
//           return { type: '[Blog Page] Remove article', id: data._id, category: data.category }
//         }),
//         catchError(()=> EMPTY)
//       ))
//   ));

//   onUpdateArticle$ = createEffect(()=> this.actions$.pipe(
//     ofType('[Blog Page] On update article'),
//     exhaustMap(({article}) => this.articlesService.updateArticle(article)
//       .pipe(
//         map(data => {
//           this.router.navigate(['/blog']);
//           Swal.fire( 
//             'Artículo Modificado',               
//             'El artículo '+ data.title +' ha sido actualizado exitosamente',
//             'success'
//         );
//           return { type: '[Blog Page] Update article', article: data }
//         }),
//         catchError(()=>{
//           Swal.fire(
//             'Error Modificación Artículo',                
//             'El título ingresado ya existe',
//             'error'
//         );
//           return of({ type: '[All Pages] Finish loading'})
//         })
//       ))
//   ));

//   constructor(
//     private actions$: Actions,
//     private articlesService: ArticlesService,
//     private router: Router
//   ) {}
// }