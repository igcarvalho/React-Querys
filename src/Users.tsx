// import { useQuery } from "@tanstack/react-query";
// import type { IUser } from "./types";
//  import sleep from "./sleep";
import { useUsers } from "./hooks/useUsers";

export default function Users() {
    const { users, refetch, isFetching, isLoading , error} = useUsers()

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
                {error && <h1 className="text-red-400">{error.toString()}</h1>}
            </div>

            {/* Lista de usuários */}
            {users.map(user => (
                <div key={user.id} className="mt-2 p-2 border border-gray-600 rounded">
                    <strong className="block text-red-300">{user.name}</strong>
                    <strong className="text-gray-300">{user.email}</strong>
                </div>
            ))}
        </div>
    );
}
