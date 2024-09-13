import { html } from 'lit';
import { miniMapStyles } from './mini-map-styles.js';

export function MiniMapMain(base) {
  return class extends base {
    static get properties() {
      return {
        startDate: { type: String },
        endDate: { type: String },
        weekStart: { type: String }, // 'sunday' o 'monday'
      };
    }

    constructor() {
      super();
      this.startDate = '2023-01-01';
      this.endDate = '2023-12-31';
      this.weekStart = 'monday'; // Valor por defecto
    }

    static styles = [miniMapStyles];

    // Método para generar el diálogo del minimapa del calendario
    minimapTemplate() {
      return html`
        <tr-dialog id="miniMapDialog" heading="Selecciona las semanas" scrimClickAction="">
          <div class="layout vertical flex center-justified">
            <div class="calendar-minimap">
              <div class="calendar-header">
                <span></span> <!-- Espacio para YW/MW -->
                ${this.mmDayNames.map(day => html`<span>${day}</span>`)}
              </div>
              <div class="calendar-body">
                ${this.generateCalendarWeeks(this.startDate, this.endDate, this.weekStart).map(week => html`
                  <div class="calendar-week">
                    <span class="week-number">
                      YW${week.yearWeekNumber} / MW${week.monthWeekNumber}
                    </span>
                    ${week.days.map(day => html`
                      <label>
                        <input type="checkbox" ?disabled="${day.disabled}" />
                        ${day.date ? day.date.getDate() : ''}
                      </label>
                    `)}
                  </div>
                `)}
              </div>
            </div>

            <div style="margin-top:30px;text-align:center">
              <mwc-button size="xl" slot="secondaryAction" dialogAction="decline">
                Cancelar
              </mwc-button>
              <mwc-button size="xl" slot="primaryAction" @click="${this.handleSubmit}">
                Confirmar
              </mwc-button>
            </div>
          </div>
        </tr-dialog>
      `;
    }

    // Funciones auxiliares para manejar el diálogo
    openDialog() {
      const dialog = this.shadowRoot.querySelector('tr-dialog#miniMapDialog');
      if (dialog) {
        dialog.show();
      } else {
        console.error('El diálogo no se ha encontrado en el DOM.');
      }
    }

    handleSubmit() {
      const checkboxes = this.shadowRoot.querySelectorAll('input[type="checkbox"]');
      const selectedDates = [];
      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          selectedDates.push(checkbox.parentNode.textContent.trim());
        }
      });
      console.log('Fechas seleccionadas:', selectedDates);
      this.closeDialog();
    }
    get miniMapDialog() {
        return this.shadowRoot.querySelector('tr-dialog#miniMapDialog');
    }

    closeDialog() {
      const dialog = this.shadowRoot.querySelector('tr-dialog#miniMapDialog');
      if (dialog) {
        dialog.close();
      }
    }

    get mmDayNames() {
      return this.weekStart === 'monday'
        ? ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
        : ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    }

    generateCalendarWeeks(startDate, endDate, weekStart) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const weeks = [];
      let currentDate = new Date(start);
      let weekDays = [];
      let yearWeekNumber = this.getWeekNumber(currentDate);
      let monthWeekNumber = this.getMonthWeekNumber(currentDate);
      const weekOffset = weekStart === 'monday' ? 1 : 0;

      while (currentDate <= end) {
        const dayOfWeek = (currentDate.getDay() - weekOffset + 7) % 7;

        if (dayOfWeek === 0 && weekDays.length > 0) {
          weeks.push({ yearWeekNumber, monthWeekNumber, days: weekDays });
          weekDays = [];
          yearWeekNumber = this.getWeekNumber(currentDate);
          monthWeekNumber = this.getMonthWeekNumber(currentDate);
        }

        weekDays.push({ date: new Date(currentDate), disabled: false });
        currentDate.setDate(currentDate.getDate() + 1);
      }

      if (weekDays.length > 0) {
        weeks.push({ yearWeekNumber, monthWeekNumber, days: weekDays });
      }

      return weeks;
    }

    getWeekNumber(date) {
      const startOfYear = new Date(date.getFullYear(), 0, 1);
      const dayOfYear = ((date - startOfYear + 86400000) / 86400000);
      return Math.ceil((dayOfYear + startOfYear.getDay()) / 7);
    }

    getMonthWeekNumber(date) {
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const dayOfMonth = ((date - startOfMonth + 86400000) / 86400000);
      return Math.ceil((dayOfMonth + startOfMonth.getDay()) / 7);
    }
  };
}
