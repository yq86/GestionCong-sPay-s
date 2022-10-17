import { MatDialogModule } from '@angular/material/dialog';
import { Component, Inject, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent,CalendarView } from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { FlatpickrModule } from 'angularx-flatpickr';
import flatpickr from "flatpickr";
import { DemandeDateComponent } from '../demande-date/demande-date.component';


const colors: Record<string, EventColor> = {

  sent: {
    primary: '#1e90ff',
    secondary: '#1e90ff',
  },
  validate: {
    primary: '#13F059',
    secondary: '#13F059',
  },
  refuse: {
    primary: '#DC4E30 ',
    secondary: '#DC4E30',
  },
};
@Component({
  selector: 'app-demandes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.css']
})
export class DemandesComponent implements OnInit {

  modalContent!: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  userId!: string | null;
  startingDate!: Date;
  endingDate!: Date;
  typeId!: number;
  viewDate: Date = new Date();


  constructor(
    private modalService: NgbModal,
    private dialogService: MatDialog
    ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem("id");
  }

  @ViewChild('modalContent', { static: true })

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: { ...colors['sent'] },
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: { ...colors['validate'] },
      actions: this.actions,
    },

  ];

  activeDayIsOpen: boolean = true;


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modalService.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {

    const modalRef = this.dialogService.open(DemandeDateComponent, {
      width: '600px',
      height: '400px',
      data: {UserId: this.userId, startingDate: this.startingDate, endingDate: this.endingDate, TypeId: this.typeId}
    });
    modalRef.afterClosed().subscribe(result => {
      console.log(result)
      // to create request
    })

    this.events = [
      //...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors['sent'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
