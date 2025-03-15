import { FormTypeDTO } from '../types/form';

interface TileProps {
  title: string;
  data: FormTypeDTO;
  isNew: boolean;
}

const Tile = ({ title, data, isNew }: TileProps) => {
  return (
    <div
      className={`p-6 w-full max-w-lg shadow-lg rounded-lg p-10 ${isNew ? 'bg-green-100' : 'bg-white'}`}
    >
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <strong className="font-medium">Name:</strong>
          <span className="ml-2 text-gray-700">{data.name || 'N/A'}</span>
        </div>
        <div className="flex justify-between items-center">
          <strong className="font-medium">Age:</strong>
          <span className="ml-2 text-gray-700">{data.age || 'N/A'}</span>
        </div>
        <div className="flex justify-between items-center">
          <strong className="font-medium">Email:</strong>
          <span className="ml-2 text-gray-700">{data.email || 'N/A'}</span>
        </div>
        <div className="flex justify-between items-center">
          <strong className="font-medium">Password:</strong>
          <span className="ml-2 text-gray-700">
            {data.password ? data.password : 'N/A'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <strong className="font-medium">Repeat Password:</strong>
          <span className="ml-2 text-gray-700">
            {data.passwordRepeat ? data.passwordRepeat : 'N/A'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <strong className="font-medium">Gender:</strong>
          <span className="ml-2 text-gray-700">{data.gender || 'N/A'}</span>
        </div>
        <div className="flex justify-between items-center">
          <strong className="font-medium">Terms Accepted:</strong>
          <span className="ml-2 text-gray-700">
            {data.terms ? 'Yes' : 'No'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <strong className="font-medium">Picture Uploaded:</strong>
          <div className="ml-2 text-gray-700">
            {data.picture ? (
              <img
                src={data.picture}
                alt="Uploaded"
                className="w-24 h-24 object-cover rounded"
              />
            ) : (
              <span className="w-24 h-24 block bg-gray-200 flex items-center justify-center rounded">
                No Image
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <strong className="font-medium">Country:</strong>
          <span className="ml-2 text-gray-700">{data.country || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default Tile;
