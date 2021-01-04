import React, { useState } from 'react'
//action de redux
import { crearNuevoProducto } from '../actions/productoActions';
import { useDispatch, useSelector } from 'react-redux';
import { mostrarAlerta, ocultarAlertaAction } from '../actions/alertaAction';

const NewProduct = ({history}) => {
    //state del componente 
    const [nombre, guardarNombre] = useState('')
    const [precio, guardarPrecio] = useState(0)
    //utlizar dispach para comunicarze con la acciones
    const dispatch = useDispatch()
    //acceder al state del store
    const spinner = useSelector(state => state.productos.loading)
    const error = useSelector(state => state.productos.error)
    const alerta = useSelector(state => state.alerta.alerta)
    //llamar la accion del productoAction
    const agregarProducto = (producto) => dispatch( crearNuevoProducto(producto) )

    const submitNuevoProducto = e => {
        e.preventDefault();
        //validar formulario
        if(nombre.trim() === '' || precio <= 0){
            const alerta = {
                msg : 'Ambos campos son obligatorio',
                classes : 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch( mostrarAlerta(alerta) ) 
            return
        }
        dispatch( ocultarAlertaAction() )
        //crear nuevo producto
        agregarProducto({
            nombre,
            precio
        })
        //redireccionar 
        history.push('/')
    }
    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                           Agregar Nuevo Producto
                        </h2>
                        { alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null }
                        <form className="form-group"
                            onSubmit = { submitNuevoProducto }
                        >
                            <label>Nombre Producto</label>
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Nombre Producto"
                                name="name"
                                value={nombre}
                                onChange={e => guardarNombre(e.target.value)}
                            />
                            <label>Precio del producto</label>
                            <input 
                                type="number"
                                className="form-control"
                                placeholder="Precio Producto"
                                name="price"
                                value={precio}
                                onChange={e => guardarPrecio( Number(e.target.value) )}
                            />
                            <button 
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >
                                Agregar
                            </button>
                        </form>
                        {spinner ? <p>cargando...</p> : null}
                        {error ? <p className="alert alert-danger p2">Hubo un error</p> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default NewProduct;