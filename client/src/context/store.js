import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './SliceAPI'
import regulationReducer from './regulationSlice'
import activeRegulationReducer from './activeRegulationSlice'
import activeClauseReducer from './activeClauseSlice'
import { userApiSlice } from './userSliceAPI'
import viewerReducer from './viewerSlice'

const myMiddleware = store => next => action => {
    switch (action.type) {

        case 'LOAD_MODEL':
            var viewer = action.object; // Assuming 'object' is passed as part of the action
            const path = action.value;
            viewer.loadXkt(path); // Call the object's method
            break;
        case 'CLEAN_MODEL':
            var viewer = action.object; // Assuming 'object' is passed as part of the action
            if (viewer.sceneModel) {
                viewer.cleanModel();
            }

            break;
        case 'CLEAN_VIEWER':
            var viewer = action.object;
            viewer.navCube.destroy();
            break;
        case 'HIGHLIGHT_ELEMENTS':
            var viewer = action.object;
            var id = action.value
            viewer.highlightElements(id);
            break;

    }
    return next(action);
};



export default configureStore({
    reducer: {
        regulations_list: regulationReducer,
        activeRegulation: activeRegulationReducer,
        activeClause: activeClauseReducer,
        viewer: viewerReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [userApiSlice.reducerPath]: userApiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        ((getDefaultMiddleware({
            serializableCheck: false
        }).concat(apiSlice.middleware)).concat(userApiSlice.middleware)).concat(myMiddleware)
})

