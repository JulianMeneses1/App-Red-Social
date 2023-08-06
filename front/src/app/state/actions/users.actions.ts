import { createAction, props } from "@ngrx/store";
import { UserModel } from "src/app/core/models/User.interface";

export const loadAllArticles = createAction(
    '[Blog Page] Load all articles',
    props<{ page?: number, isScrolling?:boolean }>()
);

export const loadArticlesByCategory = createAction(
    '[Blog Page] Load articles by category',
    props<{ page?:number,category: string, isScrolling?:boolean }>()
);


export const createUser = createAction(
    '[Register Page] Create user',
    props<{ user: object }>()
);

export const loadArticlesBySearcher = createAction(
    '[Blog Page] Load articles by searcher',
    props<{ search: string }>()
);

// con props pasamos un argumento a la acción, en este caso un array de artículos bajo la propiedad articles
export const loadedAllArticles = createAction(
    '[Blog Page] Loaded all articles success',
    props<{ articles: UserModel[] }>()
);

export const loadedArticlesByCategory = createAction(
    '[Blog Page] Loaded articles by category success',
    props<{ articles: UserModel[], category : string }>()
);

export const loadedArticlesBySearcher = createAction(
    '[Blog Page] Loaded articles by searcher success',
    props<{ articles: UserModel[] }>()
);

export const onAddArticle = createAction(
    '[Create Article Page] On add article',
    props<{ article: UserModel }>()
);

export const onRemoveArticle = createAction(
    '[Blog Page] On remove article',
    props<{ id: string }>()
);

export const onUpdateArticle = createAction(
    '[Blog Page] On update article',
    props<{ article: UserModel }>()
);

export const addArticle = createAction(
    '[Create Article Page] Add article',
    props<{ article: UserModel }>()
);

export const removeArticle = createAction(
    '[Blog Page] Remove article',
    props<{ id: string, category: string }>()
);

export const updateArticle = createAction(
    '[Blog Page] Update article',
    props<{ article: UserModel }>()
);

export const finishLoading = createAction(
    '[All Pages] Finish loading'
);