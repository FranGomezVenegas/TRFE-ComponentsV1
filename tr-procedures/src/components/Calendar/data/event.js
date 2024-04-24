export const events = {
  "program_calendar": {
    "calendar_id": 1,
    "program_name": "LlenadoViales",
    "program_config_version": 1,
    "schedule_size_unit": "MONTHS",
    "schedule_size": 12,
    "start_date": "2022-06-01",
    "end_date": "2023-05-31",
    "day_of_week": "MONDAY",
    "holidays_calendar": [
      {
        "id": 1,
        "description_en": "Spanish labor calendar",
        "description_es": "Calendario laboral español",
        "dates": [
          {
            "id": 1,
            "date": "2023-01-06",
            "description_en": "King's day",
            "description_es": "Dia de los Reyes"
          }
        ]
      }
    ],
    "program_calendar_recursive_entry": [
      {
        "id": 1,
        "start_date": "2023-01-01",
        "end_date": "2023-01-31",
        "purpose_en": "All Fridays on January",
        "purpose_es": "Todos los viernes de Enero"
      }
    ],
    "dates": [
      {
        "id": 1,
        "date": "2023-01-06",
        "description_en": "King's day",
        "description_es": "Dia de los Reyes",
        "is_holidays": true,
        "conflict": false,
        "conflict_detail": "",
        "location": ""
      },
      {
        "id": 1,
        "date": "2023-01-06",
        "description_en": "All Fridays on January",
        "description_es": "Todos los viernes de Enero",
        "is_holidays": false,
        "conflict": true,
        "conflict_detail": "Holidays day",
        "location": "L1|L2"
      },
      {
        "id": 1,
        "date": "2023-01-13",
        "description_en": "All Fridays on January",
        "description_es": "Todos los viernes de Enero",
        "is_holidays": false,
        "conflict": false,
        "conflict_detail": "",
        "location": "L1|L2"
      },
      {
        "id": 1,
        "date": "2023-01-20",
        "description_en": "All Fridays on January",
        "description_es": "Todos los viernes de Enero",
        "is_holidays": false,
        "conflict": false,
        "conflict_detail": "",
        "location": "L1|L2"
      },
      {
        "id": 1,
        "date": "2023-01-27",
        "description_en": "All Fridays on January",
        "description_es": "Todos los viernes de Enero",
        "is_holidays": false,
        "conflict": false,
        "conflict_detail": "",
        "location": "L1|L2"
      }

    ]
  }
}