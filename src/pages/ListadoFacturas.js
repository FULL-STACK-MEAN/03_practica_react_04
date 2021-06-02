import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ListadoFacturas() {

    const [facturas, setFacturas] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/facturas')
             .then(res => {
                 setFacturas([...res.data.facturas]);
             })
             .catch(err => console.log(err))
    })

    const handleDeleteFactura = (event) => {
        console.log(event)
        // axios.delete('http://localhost:8000/facturas/' + id)
        //      .then(res => {console.log(res)})
        //      .catch(err => {console.log(err)})
    }

    return (
        <div className="container show">
            <div className="row">
                <div className="col-100">
                    <h1 className="flex j-between a-center">
                        Listado de Facturas
                        <Link to="/crear-factura">
                            <button>Crear Factura</button>
                        </Link>
                    </h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Fecha</th>
                                <th>Importe sin IVA</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                              facturas.map((factura, index) => {
                                return <tr key={index}>
                                    <td>{factura.cliente}</td>
                                    <td>{factura.fechaFactura}</td>
                                    <td>{factura.baseImponible}</td>
                                    <td>
                                        <Link to={"/actualizar-factura/" + factura.id}>
                                            <button className="outline">Actualizar</button>
                                        </Link>
                                        <button onClick={handleDeleteFactura} idFactura={factura.id}>Eliminar</button>
                                    </td>
                                </tr>
                               })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
