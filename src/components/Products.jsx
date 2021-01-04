import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { obtenerProductosAction } from '../actions/productoActions';
import Producto from './Producto';

const Products = () => {
    const dispatch = useDispatch();
    useEffect(() => {
       //consultar
       const listarProducto = () => dispatch( obtenerProductosAction() ) 
       listarProducto()
       //eslint-disable-next-line
    }, [])
    //obtener el state 
    const productos = useSelector( state => state.productos.productos)
    const error = useSelector ( state => state.productos.error )
    const spinner = useSelector(state => state.productos.loading)
    return (
        <>
            <h2 className="text-center my-5">
                Lista de Productos
            </h2>
            { error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null }
            { spinner ? <p className="font-weight-bold alert alert-success text-center mt-4">Cargando...</p> : null }
            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    { productos.length === 0 ? 'no hay productos' : (
                        productos.map((producto) => {
                            return(
                                <Producto 
                                    key={producto.id}
                                    producto={producto}
                                />
                            )
                        }) 
                    )}
                </tbody>
            </table>
        </>
    );
}
 
export default Products;