// import { createReducer, on } from "@ngrx/store"
// import { loadAllArticles, addArticle, removeArticle, updateArticle, loadArticlesByCategory, loadArticlesBySearcher, loadedAllArticles, 
//         loadedArticlesByCategory, loadedArticlesBySearcher, onAddArticle, onRemoveArticle, onUpdateArticle, finishLoading } from "../actions/articles.actions"
// import { UserState } from "src/app/core/models/User.state.interface"

// const initialArticles = JSON.parse(sessionStorage.getItem('articles')!) || {
//     Todos:[],
//     Política:[],
//     Deportes:[],
//     Economía:[],
//     Medioambiente:[],
//     Vacaciones:[],
//     Búsqueda:[]
// }

// export const initialState: UserState = { isLoading: false, users : initialArticles } 

// export const articlesReducer = createReducer(
//     initialState,
//     on(loadAllArticles, (state) => ({...state, isLoading : true})),
//     on(loadArticlesByCategory, (state) => ({...state, isLoading : true})),
//     on(loadArticlesBySearcher, (state) => ({...state, isLoading : true})),
//     on(loadedAllArticles, ((state, {articles}) => {
//         const updatedArticles = {
//             ...state.articles,
//             Todos: articles
//           };
//         sessionStorage.setItem('articles',JSON.stringify(updatedArticles));
//         return {...state, 
//                 isLoading : false,
//                 articles: updatedArticles
//                 }
//         })
//     ),
//     on(loadedArticlesByCategory, ((state, {articles, category}) => {
//         const updatedArticles = {
//             ...state.articles,
//             [category]: articles
//           };
//         sessionStorage.setItem('articles',JSON.stringify(updatedArticles));
//         return {...state, 
//                 isLoading : false,
//                 articles: updatedArticles
//                 }
//         })
//     ),
//     on(loadedArticlesBySearcher, ((state, {articles}) => {
//         const updatedArticles = {
//             ...state.articles,
//             Búsqueda: articles
//           };
//         sessionStorage.setItem('articles',JSON.stringify(updatedArticles));
//         return {...state, 
//                 isLoading : false,
//                 articles: updatedArticles
//                 }
//         })
//     ),
//     on(onAddArticle, (state) => ({...state, isLoading : true})),
//     on(onRemoveArticle, (state) => ({...state, isLoading : true})),
//     on(onUpdateArticle, (state) => ({...state, isLoading : true})),
//     on(addArticle, ((state, {article}) => {
//         const updatedArticles = {
//             ...state.articles,
//             Todos: [...state.articles['Todos'], article],
//             [article.category]: [...state.articles[article.category], article]
//           };   
//         sessionStorage.setItem('articles',JSON.stringify(updatedArticles));
//         return {...state, 
//                 isLoading : false,
//                 articles: updatedArticles
//                 }
//         })
//     ),
//     on(removeArticle, ((state, {id, category}) => {      
//         const updatedArticles = {
//             ...state.articles,
//             Todos: [...state.articles['Todos'].filter(existingArticle => existingArticle._id!=id)],
//             [category]: [...state.articles[category].filter(existingArticle => existingArticle._id!=id)]
//           };   
//         sessionStorage.setItem('articles',JSON.stringify(updatedArticles));
//         return {...state, 
//                 isLoading : false,
//                 articles: updatedArticles
//                 }
//         })
//     ),
//     on(updateArticle, ((state, {article}) => {  
//         const updatedArticles = {
//             ...state.articles,
//             Todos: [...state.articles['Todos'].map(existingArticle => {
//                 if (existingArticle._id == article._id) {
//                     return{
//                         ...article
//                     }
//                 };
//                 return existingArticle;
//             })],
//             [article.category]: [...state.articles[article.category].map(existingArticle => {
//                 if (existingArticle._id == article._id) {
//                     return{
//                         ...article
//                     }
//                 };
//                 return existingArticle;
//             })]
//           };   
//         sessionStorage.setItem('articles',JSON.stringify(updatedArticles));
//         return {...state, 
//                 isLoading : false,
//                 articles: updatedArticles
//                 }
//         })
//     ),
//     on(finishLoading, ((state)=> {
//         return {...state,
//                 isLoading: false
//                }
//     }))   
// )