import logo from './logo.svg';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import 'bootstrap/dist/css/bootstrap.min.css';
import Headernav from './component/Header';
import { Outlet } from 'react-router-dom';
const App = () => {


  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>Count = {count}</div>
        <button onClick={() => dispatch(increaseCounter())}>Increase</button>
        <button onClick={() => dispatch(decreaseCounter())}>Decrease</button>
      </header> */}
      <div className='header-contariner'>
          <Headernav/>
      </div>
      
      <div className='body-container'>
      <div className='sidenav-contain'>
        </div>
        <div className='User-contain'>
          <Outlet/>
        </div>

      </div>
      


    </div>
  );
}

export default App;
