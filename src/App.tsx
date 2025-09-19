
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production';


import Users from './Users';


 const  queryClient = new QueryClient()
export default function App() {
        return (
        <QueryClientProvider client={queryClient}>
          <Users/>
          <ReactQueryDevtools buttonPosition='bottom-left' position='right' />
        </QueryClientProvider>

        )
}
