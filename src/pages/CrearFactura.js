import React, {useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function CrearFactura() {

    const history = useHistory();

    const [form, setForm] = useState({
        cliente: '',
        cif: '',
        fechaFactura: (new Date()).toISOString().substring(0, 10),
        baseImponible: 0,
        tipoIVA: 0.21,
        importeIVA: 0,
        totalFactura: 0
    })

    const handleChangeForm = (event) => {
        if(event.target.name === 'baseImponible') {
            setForm(prevForm => {
                const newImporteIVA = event.target.value * 1 * prevForm.tipoIVA ;
                const newTotalFactura = event.target.value * 1 + event.target.value * prevForm.tipoIVA;
                return {
                    ...prevForm, 
                    [event.target.name]: event.target.value, 
                    importeIVA: newImporteIVA,
                    totalFactura: newTotalFactura
                }
            })
        } else if (event.target.name === 'tipoIVA') {
            setForm(prevForm => {
                const newImporteIVA = event.target.value * 1 * prevForm.baseImponible;
                const newTotalFactura = prevForm.baseImponible * 1 + event.target.value * prevForm.baseImponible ;
                return {
                    ...prevForm, 
                    [event.target.name]: event.target.value, 
                    importeIVA: newImporteIVA,
                    totalFactura: newTotalFactura
                }
            })
        } else {
            setForm({
                ...form,
                [event.target.name]: event.target.value
            })
        }

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const {importeIVA, totalFactura, ...factura} = form; // Uso de operador rest (...) en desestructuración
        axios.post('http://localhost:8000/facturas', factura)
             .then(res => {
                 console.log(res);
                 history.push('/');
              })
             .catch(err => console.log(err))
    }

    return (
        <div className="container show">
            <div className="row">
                <div className="col-100">
                    <form onSubmit={handleSubmit}>
                        <h1>Nueva Factura</h1>
                        <div className="row">
                            <div className="col-100">
                                <label>Cliente</label>
                                <input type="text"
                                       name="cliente"
                                       value={form.cliente}
                                       onChange={handleChangeForm}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-50 p-r">
                                <label>CIF</label>
                                <input type="text" 
                                       name="cif"
                                       value={form.cif}
                                       onChange={handleChangeForm}/>
                            </div>
                            <div className="col-50 p-l">
                                <label>Fecha</label>
                                <input type="date" 
                                       name="fechaFactura"
                                       value={form.fechaFactura}
                                       onChange={handleChangeForm}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-50"></div>
                            <div className="col-50 p-l">
                                <label>Base imponible</label>
                                <input type="number" 
                                       name="baseImponible"
                                       value={form.baseImponible}
                                       onChange={handleChangeForm}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-50"></div>
                            <div className="col-50 p-l">
                                <label>% IVA</label>
                                <select name="tipoIVA"
                                        value={form.tipoIVA}
                                        onChange={handleChangeForm}>
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
                                <input type="number" 
                                       name="importeIVA"
                                       value={form.importeIVA}
                                       readOnly/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-50"></div>
                            <div className="col-50 p-l">
                                <label>Total Factura con IVA</label>
                                <input type="number" 
                                       name="totalFactura"
                                       value={form.totalFactura}
                                       readOnly/>
                            </div>
                        </div>
                        <div className="flex j-end a-center m-t">
                            <button type="submit">Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
