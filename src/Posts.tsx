// import { useQuery } from "@tanstack/react-query";
// import sleep from "./sleep";
// import type { IUser } from "./types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import type { IUser } from "./types";
import sleep from "./sleep";

export function Posts() {
    const queryClient = useQueryClient()
     //  const { data, refetch, isFetching, isLoading , error} = useUsers()
    useQuery({
        queryKey: ['users'],
        queryFn:  async (): Promise<IUser[]> => {
                  //  throw new Error("Deu error");
                     await sleep(500);
                     const response = await fetch('http://localhost:3000/users');
                     return response.json();
                },
            });

  function handleMouseEnter() {
    queryClient.prefetchQuery({
        queryKey: ['users'],
        queryFn:  async (): Promise<IUser[]> => {
                  //  throw new Error("Deu error");
                     await sleep(500);
                     const response = await fetch('http://localhost:3000/users');
                     return response.json();
                },
            });
  }

    return(
        <pre>
            {/* {JSON.stringify(data, null , 2)} */}
            Posts
             <br/> <br/>
             <Link to="/" onMouseEnter={handleMouseEnter}>
              Ir Para os usuários
              </Link>
        </pre>
    )
}
