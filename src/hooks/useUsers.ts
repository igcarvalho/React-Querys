import { useQuery } from "@tanstack/react-query";
import type { IUser } from "../types";
import sleep from "../sleep";

export function useUsers() {
        const {data, refetch, isFetching, isLoading , error} =   useQuery({
        queryKey: ['users'],
        queryFn: async (): Promise<IUser[]> => {
          //  throw new Error("Deu error");
             await sleep(500);
             const response = await fetch('http://localhost:3000/users');
             return response.json();
        },
    });
    return {
           users: data ?? [],
           refetch,
           isFetching,
           isLoading,
            error,
    }
}
