import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from './services/app.service';
import { Persona } from './interfaces/persona.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'censo';
  personaForm!: FormGroup;
  estados = ['Pernambuco', 'Alagoas', 'Sergipe', 'Paraíba', 'Rio Grande do Norte', 'Ceará', 'Bahia', 'Maranhão', 'Piauí'];
  submissionSuccess = false;
  submissionError = false;
  errorMessage = '';
  isLoading = {
    show: false,
    message: ''
  };

  constructor(private fb: FormBuilder, private personaService: AppService) { }

  ngOnInit(): void {
    this.initPersonaForm();
    this.setupFormSubscriptions();
  }

  private initPersonaForm(): void {
    this.personaForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cedula: [null, Validators.required],
      estadoPasaporte: ['', Validators.required],
      ciudadResidencia: ['', Validators.required],
      estadoResidencia: ['', Validators.required],
      recibirNotificaciones: [false],
      email: [{ value: '', disabled: true }, Validators.email],
      telefono: [{ value: '', disabled: true }, Validators.pattern(/\(\d{2}\) \d{4,5}-\d{4}/)],
      terminosAceptados: [false, Validators.requiredTrue],
    });
  }

  private setupFormSubscriptions(): void {
    this.personaForm.get('recibirNotificaciones')?.valueChanges.subscribe(val => {
      const emailControl = this.personaForm.get('email');
      const telefonoControl = this.personaForm.get('telefono');

      if (val) {
        emailControl?.setValidators([Validators.required, Validators.email]);
        telefonoControl?.setValidators([Validators.required, Validators.pattern(/\(\d{2}\) \d{4,5}-\d{4}/)]);
        emailControl?.enable();
        telefonoControl?.enable();
      } else {
        emailControl?.clearValidators();
        telefonoControl?.clearValidators();
        emailControl?.disable();
        telefonoControl?.disable();
      }

      emailControl?.updateValueAndValidity();
      telefonoControl?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.personaForm.valid) {
      this.isLoading.show = true;
      this.isLoading.message = 'Enviando...';
      const nuevaPersona: Persona = {
        nombre: this.personaForm.value.nombre ?? '',
        apellido: this.personaForm.value.apellido ?? '',
        cedula: this.personaForm.value.cedula ?? 0,
        estadoPasaporte: this.personaForm.value.estadoPasaporte ?? '',
        ciudadResidencia: this.personaForm.value.ciudadResidencia ?? '',
        estadoResidencia: this.personaForm.value.estadoResidencia ?? '',
        recibirNotificaciones: this.personaForm.value.recibirNotificaciones ?? false,
        email: this.personaForm.value.email ?? '',
        telefono: this.personaForm.value.telefono ?? ''
      };

      console.log(nuevaPersona)

      this.personaService.addPersona(nuevaPersona).subscribe(
        data => {
          console.log('Persona agregada con éxito', data);
          this.submissionSuccess = true;
          this.isLoading.show = false;
          this.isLoading.message = '';
        },
        (httpErrorResponse: HttpErrorResponse) => {
          console.error('Hubo un error al agregar la persona', httpErrorResponse.error);
          this.submissionError = true;
          this.errorMessage = httpErrorResponse.error;
          this.isLoading.show = false;
          this.isLoading.message = '';
        }
      );
    }
  }
}
