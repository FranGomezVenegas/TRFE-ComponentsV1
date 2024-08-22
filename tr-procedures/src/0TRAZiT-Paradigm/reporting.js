import { html } from "lit";

export function ReportingFunctions(base) {
return class extends (base) {

    documentFooter(data) {
        let coaData = data//FakeCOA
        let session = JSON.parse(sessionStorage.getItem("userSession"))
        let sessionDate = session.appSessionStartDate
        let sessionUser = session.header_info.first_name + " " + session.header_info.last_name + " (" + session.userRole + ")"
        let footerText = `${sessionUser} on ${sessionDate} `
        if (coaData == undefined && coaData.report_info !== undefined && coaData.report_info.report_information !== undefined) {
          footerText += `${coaData.report_info["report_information_" + this.lang]}`
        }
        return footerText
      }    

}}
