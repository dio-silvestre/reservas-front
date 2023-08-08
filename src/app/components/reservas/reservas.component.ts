import { Component } from '@angular/core';
import { Reservas } from '../../models/reservas'
import { ReservasService } from 'src/app/services/reservas.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent {
  list: Reservas[] = []
  form = {
    nomeHospede: null,
    dataInicio: null,
    dataFim: null,
    quantidadePessoas: null,
    status: "CONFIRMADA"
  }

  constructor(private service: ReservasService){}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void{
    this.service.findAll().subscribe((resposta) => {
      this.list = resposta;
    })
  }

  deleteOne(id: any): void{
    this.service.deleteOne(id).subscribe(() => {
      console.log("Reserva cancelada");
    })
    window.location.reload();
  }

  updateOnePending(id: any): void{
    this.service.updateOnePending(id).subscribe(() => {
      console.log("Reserva atualizada para pendente");
    })
    window.location.reload();
  }

  updateOneConfirm(id: any): void{
    this.service.updateOneConfirm(id).subscribe(() => {
      console.log("Reserva atualizada para confirmada");
    })
    window.location.reload();
  }
}
