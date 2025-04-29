import Customerlist from './components/Customerlist.tsx';
import Traininglist from './components/Traininglist.tsx';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typograpy from '@mui/material/Typography';
import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <nav>
        <Link to={"/"}>Customers</Link>
        <Link to={"/trainings"}>Trainings</Link>
      </nav>
      <Outlet />
    </>
  )
}

export default App
