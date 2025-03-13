import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import Tile from './components/Tile';
import {
  selectUncontrolledFormData,
  selectUncontrolledFormNewData,
  setUncontrolledFromNewData,
} from './store/formSlice';
import { useEffect } from 'react';

function App() {
  const uncontrolledFormData = useSelector(selectUncontrolledFormData);
  const uncontrolledFormNewData = useSelector(selectUncontrolledFormNewData);

  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(
      () => dispatch(setUncontrolledFromNewData(false)),
      3000
    );

    return () => clearTimeout(timeout);
  }, [uncontrolledFormNewData, dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen space-x-20">
      <div>
        <Link to="/uncontrolled-form" className="block">
          Fill Uncontrolled Form →
        </Link>
        <Tile
          title="Saved Uncontrolled Form Data"
          data={uncontrolledFormData}
          isNew={uncontrolledFormNewData}
        />
      </div>
      <div>
        <Link to="/react-hook-form">Fill React Hook Form →</Link>
        <Tile
          title="Saved React Hook Form Data"
          data={uncontrolledFormData}
          isNew={uncontrolledFormNewData}
        />
      </div>
    </div>
  );
}

export default App;
