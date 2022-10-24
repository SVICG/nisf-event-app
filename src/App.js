
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import {Dashboard, Register, Welcome, Error} from './pages'

function App() {
  return (
    <BrowserRouter>
     
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/welcome" element={<Welcome/>}/>
        <Route path="*" element={<Error/>}/>


        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
