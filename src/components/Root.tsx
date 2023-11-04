import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { OAuth } from './OAuth/OAuth';
import { Page } from './Page/Page';

const client = new QueryClient();
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/oauth/github" element={<OAuth />} />
      <Route path="/*" element={<Page />} />
    </Route>,
  ),
  { basename: `/${import.meta.env.VITE_GITHUB_REPOSITORY}` },
);

export const Root = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
};
