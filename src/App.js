
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Home from './pages/home';
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/cart' element={<Cart/>}></Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
