import { render, screen } from "@testing-library/react";
import Pokedex from "./Pokedex";

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

test("quando a página inicializa deve mostrar todos os pokémons", async () => {
  render(<Pokedex />);

  // Espera a lista inicial carregar com todos
  expect(await screen.findByText("bulbasaur")).toBeInTheDocument();
  expect(screen.getByText("charmander")).toBeInTheDocument();
  expect(screen.getByText("squirtle")).toBeInTheDocument();
});
