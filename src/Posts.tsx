import { useQuery } from "@tanstack/react-query";
import sleep from "./sleep";
import type { IUser } from "./types";

export function Posts() {
    //  const {data} = useQuery({
    //     enabled: false,
    //     queryKey: ['users'],
    //     staleTime: 5000,
    //     queryFn: async (): Promise<IUser[]> => {
    //         await sleep();
    //         const response = await fetch('http://localhost:3000/users')
    //         return response.json();
    //     },
    // });
    return(
        <pre>
            {/* {JSON.stringify(data, null , 2)} */}
            Posts
        </pre>
    )
}
