import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import Tile from './components/Tile';
import {
  selectReactHookFormFormData,
  selectReactHookFormIsNewData,
  selectUncontrolledFormData,
  selectUncontrolledFormIsNewData,
  setReactHookIsNewData,
  setUncontrolledFromIsNewData,
} from './store/formSlice';
import { useEffect } from 'react';

function App() {
  const uncontrolledFormData = useSelector(selectUncontrolledFormData);
  const uncontrolledFormNewData = useSelector(selectUncontrolledFormIsNewData);

  const reactHookFormData = useSelector(selectReactHookFormFormData);
  const reactHookFormNewData = useSelector(selectReactHookFormIsNewData);

  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(
      () => dispatch(setUncontrolledFromIsNewData(false)),
      3000
    );

    return () => clearTimeout(timeout);
  }, [uncontrolledFormNewData, dispatch]);

  useEffect(() => {
    const timeout = setTimeout(
      () => dispatch(setReactHookIsNewData(false)),
      3000
    );

    return () => clearTimeout(timeout);
  }, [reactHookFormNewData, dispatch]);

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
          data={reactHookFormData}
          isNew={reactHookFormNewData}
        />
      </div>
    </div>
  );
}

export default App;
