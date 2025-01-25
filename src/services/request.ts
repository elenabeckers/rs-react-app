export async function request<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorMessage = `Error ${response.status}: ${
        response.statusText || 'Something went wrong.'
      }`;
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unknown error occurred.');
  }
}
