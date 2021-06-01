import React from 'react'

export default function CrearFactura() {
    return (
        <div className="container show">
            <div className="row">
                <div className="col-100">
                    <form>
                        <h1>Nueva Factura</h1>
                        <div className="row">
                            <div className="col-100">
                                <label>Cliente</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-50 p-r">
                                <label>CIF</label>
                                <input type="text" />
                            </div>
                            <div className="col-50 p-l">
                                <label>Fecha</label>
                                <input type="date" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-50"></div>
                            <div className="col-50 p-l">
                                <label>Base imponible</label>
                                <input type="number" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-50"></div>
                            <div className="col-50 p-l">
                                <label>% IVA</label>
                                <select>
                                    <option value="0">0 %</option>
                                    <option value="0.04">4 %</option>
                                    <option value="0.1">10 %</option>
                                    <option value="0.21">21 %</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-50"></div>
                            <div className="col-50 p-l">
                                <label>Importe IVA</label>
                                <input type="number" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-50"></div>
                            <div className="col-50 p-l">
                                <label>Total Factura con IVA</label>
                                <input type="number" />
                            </div>
                        </div>
                        <div className="flex j-end a-center m-t">
                            <button>Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
