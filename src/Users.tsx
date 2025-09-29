// import { useQuery } from "@tanstack/react-query";
// import type { IUser } from "./types";
//  import sleep from "./sleep";
import React from "react";
import { useUsers } from "./hooks/useUsers";
import { useMutation } from "@tanstack/react-query";
import type { IUser } from "./types";
import sleep from "./sleep";

export default function Users() {
    const { users, refetch, isFetching, isLoading, error } = useUsers();

    const { mutate, isPending } = useMutation({
        mutationFn: async ({
            name,
            email,
        }: {
            name: string;
            email: string;
        }): Promise<IUser> => {
            await sleep();

            //  console.log('mutationFn() executou');
            //  throw new Error('Deu ruim na mutation');
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ name, email }),
            });

            return response.json();
        },
        onError: (error, variables) => {
            console.log(
                `Erro na request.\n${error.toString()}\nvariables:`,
                variables
            );
        },
        onSuccess: (data, variables) => {
            console.log('OnSuccess', data, variables)
        },
    });

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const elements = event.currentTarget
            .elements as typeof event.currentTarget.elements & {
            name: HTMLInputElement;
            email: HTMLInputElement;
        };

        console.log("Nome:", elements.name.value);
        console.log("Email:", elements.email.value);

        mutate({
            name: elements.name.value,
            email: elements.email.value,
        });
    }

    return (
        <div className="py-4">
            <div>
                <div className="mb-10">
                    <form
                        className="flex flex-col gap-2"
                        onSubmit={handleSubmit}
                    >
                        <input
                            className="outline-none p-1 rounded-md text-white"
                            placeholder="Nome"
                            name="name"
                        />
                        <input
                            className="outline-none p-1 rounded-md text-white"
                            placeholder="E-mail"
                            name="email"
                        />

                        <button className="bg-blue-400 py-2 text-zinc-950 rounded-md">
                            {isPending ? "Cadastrando..." : "Cadastrar"}
                        </button>
                    </form>
                </div>
            </div>
            <button
                type="button"
                className="bg-white text-black px-4 py-2 rounded-lg disabled:opacity-50"
                onClick={() => refetch()}
                disabled={isFetching}
            >
                {isFetching ? "Carregando..." : "Logar"}
            </button>

            {/* Status indicators */}
            <div className="mt-2">
                {isLoading && <h1 className="text-blue-500">Carregando...</h1>}
                {!isLoading && isFetching && (
                    <small className="text-yellow-500">Fetching...</small>
                )}
                {error && <h1 className="text-red-400">{error.toString()}</h1>}
            </div>

            {/* Lista de usuários */}
            {users.map((user) => (
                <div
                    key={user.id}
                    className="mt-2 p-2 border border-gray-600 rounded"
                >
                    <strong className="block text-red-300">{user.name}</strong>
                    <strong className="text-gray-300">{user.email}</strong>
                </div>
            ))}
        </div>
    );
}
