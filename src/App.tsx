import "./App.css";
import NavBar from './nav/NavBar';
import RoutesList from './nav/RoutesList';
import { BrowserRouter } from 'react-router-dom';

/**
 * The main App component for Jobly.
 *
 * Renders the NavBar componenet and the RoutesList component.
 *
 * index.tsx -> App -> {NavBar, RoutesList}
 */
function App() {

  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <div className='page-contents'>
        <RoutesList></RoutesList>
      </div>
    </BrowserRouter>
  )
}

export default App
