import { Box } from '@mui/material';
import Filters from './components/Filters';
import Jobs from './components/Jobs';

const App = () => {
  return (
    <Box className="column">
      <Box className="column" width="1000px">
        <Filters />
        <Jobs />
      </Box>
    </Box>
  );
};

export default App;
