import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import MensajeValidacion from '../components/MensajeValidacion';

export default function ActualizarFactura() {

    const history = useHistory();

    const { id } = useParams();

    const [form, setForm] = useState({
        cliente: '',
        cif: '',
        fechaFactura: (new Date()).toISOString().substring(0, 10),
        baseImponible: 0,
        tipoIVA: 0.21,
    })

    const [camposCalculados, setCamposCalculados] = useState({
        importeIVA: 0,
        totalFactura: 0
    })

    const [clienteValid, setClienteValid] = useState({
        valid: false,
        message: ''
    })

    const [cifValid, setCifValid] = useState({
        valid: false,
        message: ''
    })

    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/facturas/' + id)
             .then(res => {
                 setForm({
                    cliente: res.data.factura.cliente,
                    cif: res.data.factura.cif,
                    fechaFactura: (new Date(res.data.factura.fechaFactura)).toISOString().substring(0, 10),
                    baseImponible: res.data.factura.baseImponible,
                    tipoIVA: res.data.factura.tipoIVA,
                    importeIVA: 0,
                    totalFactura: 0
                 })
             })
             .catch(err => console.log(err))
    }, [id])

    useEffect(() => {
        setCamposCalculados({
            importeIVA: form.baseImponible * 1 * form.tipoIVA,
            totalFactura: form.baseImponible * 1 + form.baseImponible * 1 * form.tipoIVA
        })
    }, [form.baseImponible, form.tipoIVA])

    useEffect(() => {
        if(form.cliente.length === 0) {
            setClienteValid({
                valid: false,
                message: 'El cliente es obligatorio'
            })
        } else {
            setClienteValid({
                valid: true,
                message: 'OK'
            })
        }
    }, [form.cliente])

    useEffect(() => {
        if(form.cif.length === 0) {
            setCifValid({
                valid: false,
                message: 'El cif es obligatorio'
            })
        } else {
            setCifValid({
                valid: true,
                message: 'OK'
            })
        }
    }, [form.cif])

    useEffect(() => {
        if(clienteValid.valid && cifValid.valid) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [clienteValid, cifValid])

    const handleChangeForm = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const {importeIVA, totalFactura, ...factura} = form; // Uso de operador rest (...) en desestructuración
        axios.put('http://localhost:8000/facturas/' + id, factura)
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
                        <h1>Modificar Factura</h1>
                        <div className="row">
                            <div className="col-100">
                                <label>
                                    Cliente
                                    <MensajeValidacion validator={clienteValid} />
                                </label>
                                <input type="text"
                                       name="cliente"
                                       value={form.cliente}
                                       onChange={handleChangeForm}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-50 p-r">
                                <label>
                                    CIF
                                    <MensajeValidacion validator={cifValid} />
                                </label>
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
                                       value={camposCalculados.importeIVA}
                                       readOnly/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-50"></div>
                            <div className="col-50 p-l">
                                <label>Total Factura con IVA</label>
                                <input type="number" 
                                       name="totalFactura"
                                       value={camposCalculados.totalFactura}
                                       readOnly/>
                            </div>
                        </div>
                        <div className="flex j-end a-center m-t">
                            <button type="submit"
                                    disabled={!formValid}>
                                Guardar cambios
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
