import { render, screen, fireEvent, act } from "@testing-library/react";
import Pokedex from "../components/Pokedex";
import '@testing-library/jest-dom';

const mockPokemonData = [
  { name: "bulbasaur", type: "grass", sprites: { front_default: "bulbasaur.png" } },
  { name: "charmander", type: "fire", sprites: { front_default: "charmander.png" } },
  { name: "squirtle", type: "water", sprites: { front_default: "squirtle.png" } },
];

describe('Pokedex Search', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockPokemonData)
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("deve exibir apenas pokémons do tipo Fire ao selecionar o filtro", async () => {
    await act(async () => {
      render(<Pokedex />);
    });

    // Wait for initial render
    await screen.findByText(/bulbasaur/i);

    // Change filter to fire type
    await act(async () => {
      fireEvent.change(screen.getByRole("combobox"), { 
        target: { value: "fire" } 
      });
    });

    // Check filtered results
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    expect(screen.queryByText(/bulbasaur/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/squirtle/i)).not.toBeInTheDocument();
  });
});