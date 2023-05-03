export interface Pokemon{
    id: number;
    name: string;
    image: string;
    attack: number;
    defense: number;
    hp?: number;
    type?: string;
    id_author?: number;
}

export interface CreatePokemonDTO extends Omit<Pokemon, 'id'>{}

export interface UpdatePokemonDTO extends Partial<CreatePokemonDTO>{}