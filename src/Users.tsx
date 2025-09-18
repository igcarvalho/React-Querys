import { useQuery } from "@tanstack/react-query";
import type { IUser } from "./types"

export default function Users() {
       const { data } = useQuery({
        queryKey: ['users'],
        queryFn: async (): Promise<IUser[]> => {
            const response = await fetch('http://localhost:3000/users')
            return response.json();
        },

    }, );


    return (
              <div>
                {data?.map(user => (
                    <div key={user.id}>
                    <strong className="block text-red-300">{user.name}</strong>
                    <strong>{user.email}</strong>
                    </div>
                ))}
            </div>
    )
}
