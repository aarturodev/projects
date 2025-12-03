import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TicketService } from '../../services/tickets';

@Component({
  selector: 'app-tickets',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css',
})
export class Tickets implements OnInit {

  private ticketService = inject(TicketService)

  tickets: any[] = []
  statusList = ['OPEN', 'IN_PROGRESS', 'CLOSED']

  ngOnInit(): void {
    this.loadTickets();
  }



 form = new FormGroup({
  title: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
  description: new FormControl<string>('', { validators: [Validators.required], nonNullable:true }),
});

  loadTickets() {
    this.ticketService.getTickets().subscribe((res) => {
      this.tickets = res
      console.log(res)
    })
  }

  createTicket() {
    if (this.form.invalid) return
    const payload = this.form.value;
    this.ticketService.createTicket(payload).subscribe(() => {
      this.form.reset()
      this.loadTickets()
    })
  }


   onStatusChange(id: string, newStatus: string) {
    this.ticketService.changeStatus(id, newStatus).subscribe(() => {
      this.loadTickets();
    });
  }


}
