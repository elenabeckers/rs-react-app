import { http, HttpResponse } from 'msw';
import {
  mockProduct,
  mockEmptySearchProductResponse,
  mockFirstPageSearchProductResponse,
  mockSecondPageSearchProductResponse,
} from './productMock';

export const handlers = [
  http.get('https://dummyjson.com/products/search', ({ request }) => {
    const searchParams = new URL(request.url).searchParams;

    const q = searchParams.get('q');
    const skip = searchParams.get('skip');

    if (q === 'empty') {
      return HttpResponse.json(mockEmptySearchProductResponse, { status: 200 });
    } else if (skip === '0') {
      return HttpResponse.json(mockFirstPageSearchProductResponse, {
        status: 200,
      });
    } else if (skip === '10') {
      return HttpResponse.json(mockSecondPageSearchProductResponse, {
        status: 200,
      });
    }
  }),

  http.get('https://dummyjson.com/products/:id', (req) => {
    const { id } = req.params;

    if (id === '1') {
      return HttpResponse.json(mockProduct, { status: 200 });
    }

    return HttpResponse.json({ message: 'Product not found' }, { status: 404 });
  }),
];
