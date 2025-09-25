
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production';


import Users from './Users';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Posts } from './Posts';


 const  queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5000,
            refetchOnWindowFocus: false,
            retry: false,
            gcTime: 3000,
        }
    },
 })
export default function App() {
        return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
             <ul>
                <li>
                    <Link to="/">Usuários </Link>
                    <Link to="/posts">Posts </Link>
                </li>
             </ul>

            <Routes>
                <Route path="/" element={ <Users/>} />
                 <Route path="/posts" element={ <Posts/>} />
            </Routes>
          <ReactQueryDevtools buttonPosition='bottom-left' position='right' />
          </BrowserRouter>
        </QueryClientProvider>

        )
}
