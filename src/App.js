import './App.css';
import Login from './Login';
import { BrowserRouter,Route } from "react-router-dom";
import Bills from "./Bills";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Route exact path="/" component={Login}/>
        <Route path="/Bills" component={Bills}/>
    </div>
    </BrowserRouter>
  );
}

export default App;
