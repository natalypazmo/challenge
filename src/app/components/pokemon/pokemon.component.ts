import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  form!: FormGroup;
  pokemons : Pokemon[] = [];
  value!:string
  id!: number;



  constructor(
    private pokemonService : PokemonService,
    private formBuilder : FormBuilder
  ){
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      image: ['', [Validators.required]],
      attack: ['', [Validators.required]],
      defense: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.pokemonService.getAll().subscribe(data => {
      this.pokemons = data;
    } , response => {
      console.log(response);
    });
  }

  search(){
    const findPokemon = this.pokemons.filter((item) => item.name.toLowerCase().includes(this.value.toLowerCase()))
    this.pokemons = findPokemon;
  }

  create(){
    if(this.form.valid) {
      let form = {...this.form.value,"hp":0,"type":"default","idAuthor":1}
      this.pokemonService.create(form).subscribe(data => {
        this.pokemons.unshift(data);
      }, response => {
        console.log(response);
      })
    }
  }

  update(pokemon: Pokemon){
    this.pokemonService.update(pokemon.id, pokemon).subscribe(data => {
      this.form.patchValue(pokemon);
      console.log(data)
    }, response => {
      console.log(response);
    })

  }

  delete(id: number){
    this.pokemonService.delete(id).subscribe(() => {
      const pokemonIndex = this.pokemons.findIndex(item => item.id === id);
      this.pokemons.splice(pokemonIndex, 1);
    }, response => {
      console.log(response);
    })
  }


  
}
