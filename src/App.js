import logo from './logo.svg';
import './App.css';
import {store} from "./actions/store"
import {Provider} from "react-redux"
import DBooks from "./components/dBooks"

function App() {
  return (
    <Provider store={store}>
     
     <DBooks/>
     
     </Provider>
   
  );
  
}


export default App;
