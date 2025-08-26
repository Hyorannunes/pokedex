import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Pokedex from "./Pokedex";

// Mock da API
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          results: [
            { name: "bulbasaur" },
            { name: "charmander" },
            { name: "squirtle" },
          ],
        }),
    })
  );
});

test("renderiza lista inicial de pokemons", async () => {
  render(<Pokedex />);

  // Espera os itens aparecerem
  expect(await screen.findByText("bulbasaur")).toBeInTheDocument();
  expect(screen.getByText("charmander")).toBeInTheDocument();
  expect(screen.getByText("squirtle")).toBeInTheDocument();
});

test("filtra pokemon pelo campo de busca", async () => {
  render(<Pokedex />);

  await screen.findByText("bulbasaur"); // espera carregar

  fireEvent.change(screen.getByPlaceholderText("Buscar Pokémon"), {
    target: { value: "char" },
  });

  expect(screen.getByText("charmander")).toBeInTheDocument();
  expect(screen.queryByText("bulbasaur")).not.toBeInTheDocument();
});
