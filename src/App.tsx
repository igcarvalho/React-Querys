
import {useQuery} from '@tanstack/react-query'

export function App() {

    useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3000/users')
            return response
        },

    });

    return (
        <h1>Hello Word!</h1>
    )
}
