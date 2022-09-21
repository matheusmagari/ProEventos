import { Component, OnInit, TemplateRef } from '@angular/core'

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { NgxSpinnerService } from 'ngx-spinner'
import { ToastrService } from 'ngx-toastr'
import { Evento } from 'src/app/models/Evento'
import { EventoService } from 'src/app/services/evento.service'

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html'
  // providers: [EventoService]
})
export class EventosComponent implements OnInit {
  modalRef?: BsModalRef
  public eventosFiltrados: Evento[] = []
  public eventos: Evento[] = []

  public larguraImagem = 150
  public margemImagem = 2
  public exibirImagem = true
  private filtroListado = ''

  public get filtroLista (): string {
    return this.filtroListado
  }

  public set filtroLista (value: string) {
    this.filtroListado = value
    this.eventosFiltrados = (this.filtroLista.length > 0)
      ? this.filtrarEventos(this.filtroLista)
      : this.eventos
  }

  public filtrarEventos (filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase()
    return this.eventos.filter(
      evento =>
        evento.tema.toLocaleLowerCase().includes(filtrarPor) ||
        evento.local.toLocaleLowerCase().includes(filtrarPor)
    )
  }

  constructor (
    private readonly eventoService: EventoService,
    private readonly modalService: BsModalService,
    private readonly toastr: ToastrService,
    private readonly spinner: NgxSpinnerService) { }

  public ngOnInit (): void {
    void this.spinner.show()
    this.getEventos()
  }

  public alterarImagem (): void {
    this.exibirImagem = !this.exibirImagem
  }

  public getEventos (): void {
    this.eventoService.getEventos().subscribe({
      next: (eventos: Evento[]) => {
        this.eventos = eventos
        this.eventosFiltrados = this.eventos
      },
      // eslint-disable-next-line n/handle-callback-err
      error: (error: any) => {
        void this.spinner.hide()
        this.toastr.error('Erro ao carregar os eventos', 'Erro!')
      },
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      complete: async () => await this.spinner.hide()
    })
  }

  openModal (template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' })
  }

  confirm (): void {
    this.modalRef?.hide()
    this.toastr.success('O evento foi deletado com sucesso!', 'Deletado!')
  }

  decline (): void {
    this.modalRef?.hide()
  }
}
