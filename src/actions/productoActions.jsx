import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    LISTAR_PRODUCTO,
    LISTAR_PRODUCTO_EXITO,
    LISTAR_PRODUCTO_ERROR,
    OBTENER_PRODUCTO,
    ELIMINAR_PRODUCTO_EXITO,
    ELIMINAR_PRODUCTO_ERROR,
    EDITAR_PRODUCTO,
    OBTENER_PRODUCTO_EDITAR,
    EDITAR_PRODUCTO_EXITO,
    EDITAR_PRODUCTO_ERROR
} from '../types'
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'

export function crearNuevoProducto(producto) {
    return async (dispatch) => {
        dispatch( agregarProducto() )

        try {
            //insertar en la api
            await clienteAxios.post('/productos', producto)
            dispatch ( agregarProductoExito(producto) )
            //alerta
            Swal.fire(
                'Correcto',
                'El producto se agrego correctamente',
                'success'
            )  
        } catch (error) {
            //si hay error cambiar el state
            dispatch ( agregarProductoError(true) )
            //laerta error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'intenta de nuevo'
            })  
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    // payload es la parte que modifica el state
    payload: true
})

const agregarProductoExito = (producto) => ({
    type: AGREGAR_PRODUCTO_EXITO,
    // payload es la parte que modifica el state
    payload: producto
})

const agregarProductoError = (estado) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    // payload es la parte que modifica el state
    payload: estado
})

//LITSAR PRODUCTOS DE LA BASE DATOS

export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch( listarProductos() )
        try {
            const respuesta = await clienteAxios.get('/productos')
            dispatch( listarProductosExito(respuesta.data) )
            
        } catch (error) {
            dispatch( listarProductosError() )
        }
    }
}

const listarProductos = () => ({
    type: LISTAR_PRODUCTO,
    payload: true
})

const listarProductosExito = (productos) => ({
    type: LISTAR_PRODUCTO_EXITO,
    payload: productos
})

const listarProductosError = () => ({
    type: LISTAR_PRODUCTO_ERROR,
    payload: true
})

// Obtener y eliminar producto
export function elminarProductoAction(id){
    return async dispatch => {
        dispatch( obtenerProducto(id) )
        try {
            await clienteAxios.delete(`/productos/${id}`)
            dispatch( eliminarProductoExito() ) 
            Swal.fire(
                'Eliminado',
                'El producto se elimino correctamente',
                'success'
              )
        } catch (error) {
            dispatch( eliminarProductoError() )
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'intenta de nuevo'
            })
        }
    }
}

const obtenerProducto = (id) => ({
    type: OBTENER_PRODUCTO,
    payload: id
})

const eliminarProductoExito = () => ({
    type: ELIMINAR_PRODUCTO_EXITO,
})

const eliminarProductoError = () => ({
    type: ELIMINAR_PRODUCTO_ERROR,
    payload: true
})

// editar producto
export function obtenerProductoEditar(producto){
    return (dispatch) => {
        dispatch( productoEditarAction(producto) )
    }
}

const productoEditarAction = (producto) => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

export function editarProducto(producto){
   return async (dispatch) => {
       dispatch( editarProductoAction(producto) )
       try {
            await clienteAxios.put(`/productos/${producto.id}`, producto)
            dispatch( editarProductoExito(producto) )
       } catch (error) {
            dispatch( editarProductoError() )
       } 
   }
}

const editarProductoAction = () => ({
    type: EDITAR_PRODUCTO,
})
const editarProductoExito = (producto) => ({
    type: EDITAR_PRODUCTO_EXITO,
    payload: producto
}) 

const editarProductoError = (producto) => ({
    type: EDITAR_PRODUCTO_ERROR,
    payload: true
}) 
