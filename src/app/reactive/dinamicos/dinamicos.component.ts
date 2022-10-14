import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  miFormulario: FormGroup = this.formBuilder.group({
    nombre   : [ , [ Validators.required, Validators.minLength(3) ] ],
    favoritos: this.formBuilder.array([
      [ 'Metal Gear' ],
      [ 'Death Strading' ]
    ],  Validators.required )
  });

  nuevoFavorito: FormControl = this.formBuilder.control( '', Validators.required );

  get favoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray;
  }

  constructor( private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
  }

  campoValido( campo: string ) {
    if( this.miFormulario.controls[campo].errors &&
        this.miFormulario.controls[campo].touched ) {
          return true;
        }

    return false;
  }

  agregarFavorito() {
    if( this.nuevoFavorito.invalid ) return;

    this.favoritosArr.push( this.formBuilder.control( this.nuevoFavorito.value, Validators.required ));

    this.nuevoFavorito.reset();
  }

  borrar( i: number ) {
    this.favoritosArr.removeAt(i);
  }

  guardar() {
    if( this.miFormulario.invalid ) {
      this.miFormulario.markAllAsTouched();

      return;
    }

    console.log( this.miFormulario.value );

    this.miFormulario.reset();
  }

}
