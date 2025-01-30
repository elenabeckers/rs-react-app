import { GENERIC_ERROR_MESSAGE } from '../constants/errorMessages';

interface ErrorPageProps {
  errorTitle: string;
  returnUrl?: string;
  returnUrlText?: string;
}

const GO_BACK_TEXT = 'Let’s go back';

const ErrorPage = ({
  errorTitle,
  returnUrl = '',
  returnUrlText = GO_BACK_TEXT,
}: ErrorPageProps) => (
  <div className="h-screen flex justify-center items-center flex-col text-center text-gray-500">
    <p className="text-2xl font-semibold mb-2 uppercase">{errorTitle}</p>
    <p className="text-lg font-thin mb-1">{GENERIC_ERROR_MESSAGE}</p>
    <a href={returnUrl} className="text-blue-500 underline text-sm">
      {returnUrlText}
    </a>
  </div>
);

export default ErrorPage;
