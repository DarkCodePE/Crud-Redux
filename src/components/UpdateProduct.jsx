import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editarProducto } from '../actions/productoActions';
import { useHistory } from 'react-router-dom';

const UpdateProduct = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    //nuevo satate de producto
    const [producto, setProducto] = useState({
        nombre : '',
        precio: ''
    })

    //producto a editar
    const productoEditar = useSelector(state => state.productos.producto)

    useEffect(() => {
        setProducto(productoEditar)
    }, [productoEditar])
    
    const onChangeProducto = (e) => {
        setProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }
 
    const { nombre, precio } = producto
    const submitEditarProducto = (e) => {
        e.preventDefault()
        dispatch( editarProducto(producto) )
        history.push('/')
    }
    return (
       <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                           Editar Producto
                        </h2>
                        <form 
                            className="form-group"
                            onSubmit={submitEditarProducto}
                        >
                            <label>Nombre Producto</label>
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Nombre Producto"
                                name="nombre"
                                value={nombre}
                                onChange={onChangeProducto}
                            />
                            <label>Precio del producto</label>
                            <input 
                                type="number"
                                className="form-control"
                                placeholder="Precio Producto"
                                name="precio"
                                value={precio}
                                onChange={onChangeProducto}
                            />
                            <button 
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >
                                Guardar cambios
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default UpdateProduct;