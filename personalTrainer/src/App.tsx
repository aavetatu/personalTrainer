import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typograpy from '@mui/material/Typography';
import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Container maxWidth="lg">
        <AppBar position="static" >
          <Toolbar>
            <Typograpy variant="h6">
              <nav>
                <Link to={"/"}>Customers</Link>
                <Link to={"/trainings"}>Trainings</Link>
              </nav>
            </Typograpy>
          </Toolbar>
        </AppBar>
        <Outlet />
        <CssBaseline />
      </Container>
    </>
  )
}

export default App
