import React from 'react';
import { Link } from 'react-router-dom';

export default function ListadoFacturas() {
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
                </div>
            </div>
        </div>
    )
}
