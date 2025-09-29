import { useMutation } from "@tanstack/react-query";
import type { IUser } from "../types";
import sleep from "../sleep";

export function useCreateUser() {
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async ({
            name,
            email,
        }: {
            name: string;
            email: string;
        }): Promise<IUser> => {
            await sleep();
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ name, email }),
            });
            return response.json();
        },
        onSuccess: (data, variables) => { console.log("OnSuccess", { data, variables }); },
        onError: (error, variables) => { console.log(`Erro: ${error}`, variables); },
    });

    return {
        createUser: mutateAsync,
        IsLoading: isPending,

    }
}
