import { Box } from '@mui/material';
import Filters from './components/Filters';
import Jobs from './components/Jobs';

const App = () => {
  return (
    <Box className="column">
      <Box className="column" sx={{ width: { sx: '500px', md: '1100px' } }}>
        <Filters />
        <Jobs />
      </Box>
    </Box>
  );
};

export default App;
