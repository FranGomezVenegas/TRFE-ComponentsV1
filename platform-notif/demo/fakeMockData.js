// fakeMockData.js
export const mockNotifications = [
    {
      message_en: "System update required. Please restart your device.",
      message_es: "Se requiere actualización del sistema. Por favor, reinicie su dispositivo.",
      is_error: false,
      log: true
    },
    {
      message_en: "Error connecting to the server. Please try again later.",
      message_es: "Error al conectar con el servidor. Por favor, inténtelo de nuevo más tarde.",
      is_error: true,
      log: true
    },
    {
      message_en: "New message from support team.",
      message_es: "Nuevo mensaje del equipo de soporte.",
      is_error: false,
      log: true
    },
    {
      message_en: "Scheduled maintenance will start at 2:00 AM.",
      message_es: "El mantenimiento programado comenzará a las 2:00 AM.",
      is_error: false,
      log: true,
      minor_messages:[
        {
            message_en: "First minor message",
            message_es: "Primer mensaje menor",
        },
        {
            message_en: "First minor message",
            message_es: "Primer mensaje menor",
        }
      ]
    }
  ];
  