import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import NavBar from './components/NavBarComponent.tsx';

createRoot(document.getElementById('root')!).render(
  <>
    <NavBar />
    <App />
  </>

)
