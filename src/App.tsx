import Filters from './components/Filters';
import Jobs from './components/Jobs';

const App = () => {
  return (
    <div className="dashboard">
      <Filters />
      <Jobs />
    </div>
  );
};

export default App;
