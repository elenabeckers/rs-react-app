import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Set up the server with the handlers
export const server = setupServer(...handlers);

// Start the server before all tests
beforeAll(() => server.listen());

// Reset all handlers to their initial state after each test
afterEach(() => server.resetHandlers());

// Close the server after all tests
afterAll(() => server.close());
