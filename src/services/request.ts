import {
  GENERIC_ERROR_MESSAGE,
  UNKNOWN_ERROR_MESSAGE,
} from '../constants/errorMessages';

export async function request<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorMessage = `Error ${response.status}: ${
        response.statusText || GENERIC_ERROR_MESSAGE
      }`;
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(UNKNOWN_ERROR_MESSAGE);
  }
}
