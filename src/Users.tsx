import React from "react";
import { useUsers } from "./hooks/useUsers";
import { useCreateUser } from "./hooks/useCreateUser";

export default function Users() {
  const { users, refetch, isFetching, isLoading, error } = useUsers();
  const { createUser, IsLoading } = useCreateUser();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const elements = event.currentTarget.elements as typeof event.currentTarget.elements & {
      name: HTMLInputElement;
      email: HTMLInputElement;
    };

    const { id } = await createUser({
      name: elements.name.value,
      email: elements.email.value,
    });

    console.log(`Redireciona para: /users/${id}`);
  }

  return (
    <div className="py-4">
      <div>
        <div className="mb-10">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <input className="outline-none p-1 rounded-md text-white" placeholder="Nome" name="name" />
            <input className="outline-none p-1 rounded-md text-white" placeholder="E-mail" name="email" />
            <button className="bg-blue-400 py-2 text-zinc-950 rounded-md">
              {IsLoading ? "Cadastrando..." : "Cadastrar"}
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

      <div className="mt-2">
        {isLoading && <h1 className="text-blue-500">Carregando...</h1>}
        {!isLoading && isFetching && <small className="text-yellow-500">Fetching...</small>}
        {error && <h1 className="text-red-400">{error.toString()}</h1>}
      </div>

      {users.map((user) => (
        <div key={user.id} className="mt-2 p-2 border border-gray-600 rounded">
          <strong className="block text-red-300">{user.name}</strong>
          <strong className="text-gray-300">{user.email}</strong>
        </div>
      ))}
    </div>
  );
}
