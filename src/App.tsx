import './App.css';
import { Link } from 'react-router';

function App() {
  return (
    <>
      <Link to="/uncontrolled-form">Uncontrolled Form</Link>
      <br />
      <Link to="/react-hook-form">React Hook Form</Link>
    </>
  );
}

export default App;
