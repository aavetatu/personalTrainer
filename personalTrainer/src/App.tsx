import Customerlist from './components/Customerlist.tsx';
import Container from '@mui/material/Container';



import CssBaseline from '@mui/material/CssBaseline';


import AppBar from '@mui/material/AppBar';


import Toolbar from '@mui/material/Toolbar';


import Typograpy from '@mui/material/Typography';

function App() {
  return (
    <Container maxWidth="lg">
      <AppBar position="static" >
        <Toolbar>
          <Typograpy variant="h6">Customers</Typograpy>
        </Toolbar>
      </AppBar>
      <Customerlist />
      <CssBaseline />
    </Container>
  )
}

export default App
