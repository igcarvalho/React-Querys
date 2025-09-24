import { useQuery } from "@tanstack/react-query";
import type { IUser } from "./types";
import sleep from "./sleep";

export default function Users() {
    const { data, refetch, isFetching, isLoading } = useQuery({
        queryKey: ['users'],
        staleTime: 5000,
        gcTime: 3000,
        queryFn: async (): Promise<IUser[]> => {
            await sleep();
            const response = await fetch('http://localhost:3000/users');
            return response.json();
        },
    });

    return (
        <div className="py-4">
            <button
                type="button"
                className="bg-white text-black px-4 py-2 rounded-lg disabled:opacity-50"
                onClick={() => refetch()}
                disabled={isFetching}
            >
                {isFetching ? 'Carregando...' : 'Logar'}
            </button>

            {/* Status indicators */}
            <div className="mt-2">
                {isLoading && <h1 className="text-blue-500">Carregando...</h1>}
                {!isLoading && isFetching && <small className="text-yellow-500">Fetching...</small>}
            </div>

            {/* Lista de usuários */}
            {data?.map(user => (
                <div key={user.id} className="mt-2 p-2 border border-gray-600 rounded">
                    <strong className="block text-red-300">{user.name}</strong>
                    <strong className="text-gray-300">{user.email}</strong>
                </div>
            ))}
        </div>
    );
}
