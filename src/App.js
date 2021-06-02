import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ActualizarFactura from "./pages/ActualizarFactura";
import CrearFactura from "./pages/CrearFactura";
import ListadoFacturas from "./pages/ListadoFacturas";

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path="/" component={ListadoFacturas} /> {/* Importante marcar exact a la ruta raiz */}
              <Route path="/crear-factura" component={CrearFactura} />
              <Route path="/actualizar-factura/:id" component={ActualizarFactura}/>
              <Route path="*">
                  <h1>Página no encontrada</h1>
              </Route>
          </Switch>
      </Router>
  );
}

export default App;
