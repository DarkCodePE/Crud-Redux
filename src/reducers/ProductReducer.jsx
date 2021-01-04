import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    LISTAR_PRODUCTO,
    LISTAR_PRODUCTO_EXITO,
    LISTAR_PRODUCTO_ERROR,
    OBTENER_PRODUCTO,
    EDITAR_PRODUCTO,
    EDITAR_PRODUCTO_EXITO,
    EDITAR_PRODUCTO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    ELIMINAR_PRODUCTO_EXITO,
    ELIMINAR_PRODUCTO_ERROR
} from '../types'

// cada reducer tiene su propio
const initialState = {
    productos: [],
    error: false,
    loading:false,
    isdelete:null,
    producto:null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case LISTAR_PRODUCTO:
        case AGREGAR_PRODUCTO:
            return {
                ...state,
                loading:action.payload
            }
        case AGREGAR_PRODUCTO_EXITO:
            return {
                ...state,
                loading: false,
                productos: [...state.productos, action.payload]
            }
        case AGREGAR_PRODUCTO_ERROR:
        case LISTAR_PRODUCTO_ERROR:
        case ELIMINAR_PRODUCTO_ERROR:  
        case EDITAR_PRODUCTO_ERROR:  
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        case LISTAR_PRODUCTO_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                productos: action.payload
            }
        case OBTENER_PRODUCTO:
            return {
                ...state,
                isdelete:action.payload
            }
        case ELIMINAR_PRODUCTO_EXITO:
            return {
                ...state,
                productos: state.productos.filter( producto => producto.id !== state.isdelete ),
                isdelete:null
            }
        case OBTENER_PRODUCTO_EDITAR:
            return {
                ...state,
                producto: action.payload
            }
        case EDITAR_PRODUCTO_EXITO:
            return {
                ...state,
                producto: null,
                productos: state.productos.map( 
                    producto => producto.id === action.payload.id ? producto = action.payload : producto
                )
            }
        default:
            return state;
    }
}