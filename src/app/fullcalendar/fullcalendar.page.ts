import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {
  FullCalendarComponent,
  FullCalendarModule,
} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import esLocale from '@fullcalendar/core/locales/es';
import itLocale from '@fullcalendar/core/locales/it';
import { AppService } from '../shared/services/app.service';
import { Product } from '../shared/types/model/product';
import { Slot, SlotsAvailability } from '../shared/types/model/slot';

@Component({
  selector: 'app-fullcalendar',
  templateUrl: './fullcalendar.page.html',
  styleUrls: ['./fullcalendar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FullCalendarModule],
})
export class FullcalendarPage implements OnInit {
  @ViewChild('fullcalendar') fullcalendar!: FullCalendarComponent;
  constructor(private appService: AppService) {}
  // il mese visualizzato nel calendario
  startMonthCalendar: Date = new Date();
  //il giorno corrente
  readonly currentDateToday: Date = new Date();
  // la data selezionata in stringa
  currentDateStr?: string;
  // le date bloccate
  blockedDates = new Set();
  // la data è stata cliccata
  dateIsClicked?: boolean;
  // la data corrente da visualizzare nel popup
  currentDate?: string;

  // gli orari/slots per un giorno selezionato
  slots: ({ selected?: boolean } & Slot)[] = [];

  slot!: Slot | null;
  tempSlot!: Slot | null;

  priceTotal: number = 0;

  // servizio / Prodotto
  product!: Product;

  availables: SlotsAvailability[] = [];
  //età bambino gratis
  freeAge: number | null = null;
  //età anziani sconto
  oldAgeDiscount: number | null = null;
  //età bambino sconto
  childAgeDiscount: number | null = null;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    locales: [itLocale, esLocale],
    firstDay: 1,
    // dateClick: this.handleDateClick.bind(this),
    headerToolbar: {
      left: 'prev',
      center: 'title',
      right: 'next',
    },
    customButtons: {
      prev: {
        // this overrides the prev button
        text: 'PREV',
        click: async () => await this.onChangeMonth('prev'),
      },
      next: {
        // this overrides the next button
        text: 'NEXT',
        click: async () => await this.onChangeMonth('next'),
      },
    },
    validRange: {
      start: new Date(
        this.currentDateToday.getFullYear(),
        this.currentDateToday.getMonth(),
        1
      ),
      end: this.getEndDate(this.currentDateToday),
    },
    businessHours: {
      // days of week. an array of zero-based day of week integers (0=Sunday)
      daysOfWeek: [1, 2, 3, 4, 5, 6], // Monday - Thursday
    },
    eventBackgroundColor: '#000000',
    selectable: true,
  };

  async ngOnInit() {
    console.log('fullcalendar');
    this.calendarOptions.events = await this.getEvents();
  }
  private getEndDate(date: Date): number {
    const year = date.getFullYear();
    const nextMonth = date.getMonth() + 1;
    const firstDayNextMonth = new Date(year, nextMonth, 1);
    firstDayNextMonth.setDate(firstDayNextMonth.getDate() - 1);

    return firstDayNextMonth.getDate();
  }
  async onChangeMonth(direction: string) {
    const calendarApi = this.fullcalendar?.getApi();
    direction === 'next' ? calendarApi?.next() : calendarApi?.prev();
    this.startMonthCalendar = new Date(
      calendarApi?.getDate().getFullYear(),
      calendarApi?.getDate().getMonth(),
      1
    );

    if (
      this.currentDateToday.getFullYear() <=
      this.startMonthCalendar.getFullYear()
    ) {
      if (
        this.currentDateToday.getMonth() <= this.startMonthCalendar.getMonth()
      ) {
        // recupero gli eventi (slots) per il calendario
        this.calendarOptions.events = await this.getEvents();
      }
    }
  }
  /**
   * Funzione che richiede la disponibilità per un servizio e ritorna l'array per il calendario per mostrare la disponibiltà.
   *
   */
  async getEvents(): Promise<any[]> {
    // data di inizio
    const dateStart = this.startMonthCalendar.toISOString().split('T')[0];
    // data di fine
    let dateEnd =
      this.startMonthCalendar?.getFullYear() +
      '-' +
      (this.startMonthCalendar.getMonth() + 2) +
      '-' +
      1;

    try {
      // recupero le date disponibili
      this.availables = await this.appService.availableSlotsRange(
        2,
        dateStart,
        dateEnd,
        1,
        0
      );

      let events: {
        start: string;
        end: string;
        display: string;
        color: string;
        classNames: string;
        overlap: boolean;
      }[] = [];
      this.blockedDates.clear();
      if (this.availables.length > 0) {
        // scorro
        this.availables.forEach((element: SlotsAvailability) => {
          if (element?.items.length == 0) {
            events.push({
              start: element?.date,
              end: element?.date,
              display: 'background',
              color: '#D9D9D9',
              classNames: 'fc-day-disable',
              overlap: false,
            });
            this.blockedDates.add(element?.date);
          }
        });
      }
      return events;
    } catch {
      return [];
    } finally {
    }
  }
  async handleDateClick(arg: DateClickArg) {
    let plusOneDay = 1000 * 60 * 60 * 24;
    // se click prima della data disponibile

    this.currentDateStr = arg['dateStr'];

    document.body.style.overflow = 'hidden';

    this.currentDate = this.formatDate(arg.date, 'it');
    try {
      // recupero  orari / slots per il giorno selezionato
      this.slots = await this.appService.availableSlots(
        2,
        this.currentDateStr + '',
        1,
        0
      );

      // rendo visibile la popup
      this.dateIsClicked = true;
    } catch (error) {
      this.slots = [];
    } finally {
    }
  }
  private formatDate(date: Date, locale: string) {
    return date.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
    });
  }
}
