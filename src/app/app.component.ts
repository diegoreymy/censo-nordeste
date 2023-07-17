import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from './app.service';
import { Persona } from './persona.model';
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
  passportError = false;

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
      pasaporteVencido: [false],
      pasaporteVencimientoProximo: [false],
      pasaportePrimeraVez: [false],
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
    this.passportError = !(this.onlyOnePassportSelected() && this.atLeastOnePassportSelected());
    if (this.personaForm.valid && !this.passportError) {
      const nuevaPersona: Persona = {
        nombre: this.personaForm.value.nombre ?? '',
        apellido: this.personaForm.value.apellido ?? '',
        cedula: this.personaForm.value.cedula ?? 0,
        pasaporteVencido: this.personaForm.value.pasaporteVencido ?? false,
        pasaporteVencimientoProximo: this.personaForm.value.pasaporteVencimientoProximo ?? false,
        pasaportePrimeraVez: this.personaForm.value.pasaportePrimeraVez ?? false,
        ciudadResidencia: this.personaForm.value.ciudadResidencia ?? '',
        estadoResidencia: this.personaForm.value.estadoResidencia ?? '',
        recibirNotificaciones: this.personaForm.value.recibirNotificaciones ?? false,
        email: this.personaForm.value.email ?? '',
        telefono: this.personaForm.value.telefono ?? ''
      };

      this.personaService.addPersona(nuevaPersona).subscribe(
        data => {
          console.log('Persona agregada con éxito', data);
          this.submissionSuccess = true;
        },
        (httpErrorResponse: HttpErrorResponse) => {
          console.error('Hubo un error al agregar la persona', httpErrorResponse.error);
          this.submissionError = true;
          this.errorMessage = httpErrorResponse.error;
        }
      );
    }
  }

  private onlyOnePassportSelected(): boolean {
    const pasaporteVencido = this.personaForm.get('pasaporteVencido')?.value ?? false;
    const pasaporteVencimientoProximo = this.personaForm.get('pasaporteVencimientoProximo')?.value ?? false;
    const pasaportePrimeraVez = this.personaForm.get('pasaportePrimeraVez')?.value ?? false;

    return (
      (pasaporteVencido && !pasaporteVencimientoProximo && !pasaportePrimeraVez) ||
      (!pasaporteVencido && pasaporteVencimientoProximo && !pasaportePrimeraVez) ||
      (!pasaporteVencido && !pasaporteVencimientoProximo && pasaportePrimeraVez)
    );
  }

  private atLeastOnePassportSelected(): boolean {
    const pasaporteVencido = this.personaForm.get('pasaporteVencido')?.value ?? false;
    const pasaporteVencimientoProximo = this.personaForm.get('pasaporteVencimientoProximo')?.value ?? false;
    const pasaportePrimeraVez = this.personaForm.get('pasaportePrimeraVez')?.value ?? false;
  
    if (!pasaporteVencido && !pasaporteVencimientoProximo && !pasaportePrimeraVez) {
      return false;
    }
    
    return pasaporteVencido || pasaporteVencimientoProximo || pasaportePrimeraVez;
  }  

  deseleccionarOtros(campoSeleccionado: string): void {
    const pasaporteVencido = this.personaForm.get('pasaporteVencido');
    const pasaporteVencimientoProximo = this.personaForm.get('pasaporteVencimientoProximo');
    const pasaportePrimeraVez = this.personaForm.get('pasaportePrimeraVez');

    if (campoSeleccionado === 'pasaporteVencido' && pasaporteVencido?.value) {
      pasaporteVencimientoProximo?.patchValue(false);
      pasaportePrimeraVez?.patchValue(false);
    } else if (campoSeleccionado === 'pasaporteVencimientoProximo' && pasaporteVencimientoProximo?.value) {
      pasaporteVencido?.patchValue(false);
      pasaportePrimeraVez?.patchValue(false);
    } else if (campoSeleccionado === 'pasaportePrimeraVez' && pasaportePrimeraVez?.value) {
      pasaporteVencido?.patchValue(false);
      pasaporteVencimientoProximo?.patchValue(false);
    }
  }
}
