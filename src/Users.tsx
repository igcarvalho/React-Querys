import { useQuery } from "@tanstack/react-query";
import type { IUser } from "./types"
import sleep from "./sleep";
export default function Users() {

       const { data, refetch, isFetching , isLoading} = useQuery({
        enabled: false,
        queryKey: ['users'],
        staleTime: 5000,
        queryFn: async (): Promise<IUser[]> => {
            await sleep();
            const response = await fetch('http://localhost:3000/users')
            return response.json();
        },
    });
    return (
         <div className="py-4">
         <button type="button"
         className="bg-white text-black px-4 py-2 rounded-lg"
         onClick={() => refetch()}
         >
            Logar
         </button>
                {/* {teste de performarce e carregamento} */}
                {isLoading && <h1>Carregando...</h1>}
                {!isLoading && isFetching && <small>Fetching...</small>}

                {data?.map(user => (
                    <div key={user.id}>
                    <strong className="block text-red-300">{user.name}</strong>
                    <strong>{user.email}</strong>
                    </div>
                ))}
            </div>
    )
}
