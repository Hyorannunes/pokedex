import { render, screen } from "@testing-library/react";
import Pokedex from "../components/Pokedex";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        {
          id: 1,
          name: "bulbasaur",
          sprites: { front_default: "bulbasaur.png" }
        }
      ])
    })
  );
});

describe('Pokedex Initial Render', () => {
  test('renders loading state initially', () => {
    render(<Pokedex />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});