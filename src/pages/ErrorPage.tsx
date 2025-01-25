import React from 'react';

interface ErrorPageProps {
  errorTitle: string;
  returnUrl: string;
}

class ErrorPage extends React.Component<ErrorPageProps> {
  render() {
    const { errorTitle, returnUrl } = this.props;

    return (
      <div className="h-screen flex justify-center items-center flex-col text-center text-gray-500">
        <p className="text-2xl font-semibold mb-2 uppercase">{errorTitle}</p>
        <p className="text-lg font-thin mb-1">Something went wrong! </p>
        <a href={returnUrl} className="text-blue-500 underline text-sm">
          Let’s go back
        </a>
      </div>
    );
  }
}

export default ErrorPage;
