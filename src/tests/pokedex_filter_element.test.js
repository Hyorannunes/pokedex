import { render, screen, fireEvent } from "@testing-library/react";
import Pokedex from "../components/Pokedex";

// Mock do fetch
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          results: [
            { name: "bulbasaur", type: "grass" },
            { name: "charmander", type: "fire" },
            { name: "squirtle", type: "water" },
          ],
        }),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test("deve exibir apenas pokémons do tipo Fire ao selecionar o filtro", async () => {
  render(<Pokedex />);

  // aguarda os 3 pokémons aparecerem
  expect(await screen.findByText(/bulbasaur/i)).toBeInTheDocument();
  expect(screen.getByText(/charmander/i)).toBeInTheDocument();
  expect(screen.getByText(/squirtle/i)).toBeInTheDocument();

  // aplica o filtro "Fire"
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "fire" } });

  // agora deve aparecer só o charmander
  expect(screen.getByText(/charmander/i)).toBeInTheDocument();
  expect(screen.queryByText(/bulbasaur/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/squirtle/i)).not.toBeInTheDocument();
});
