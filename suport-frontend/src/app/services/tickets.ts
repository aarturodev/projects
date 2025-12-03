import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private http = inject(HttpClient);

  url = 'http://localhost:3005/tickets';

  createTicket(ticket: any) {
    return this.http.post(this.url, ticket);
  }

  getTickets(): Observable<any> {
    console.log(this.http.get(this.url))
    return this.http.get(this.url);
  }

  changeStatus(ticketId: string, status: string) {
    return this.http.patch(`${this.url}/${ticketId}/status`, { status });
  }

}
