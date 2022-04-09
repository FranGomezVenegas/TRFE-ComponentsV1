import { html, css } from 'lit';
import { CredDialog } from '@trazit/cred-dialog';

export class ReloginDialog extends CredDialog {
  static get properties() {
    return {
      startSession: { type: Number },
      businessRules: { type: Boolean },
      minute: { type: Number }, // minute in microseconds
      noActivity: { type: Boolean },
      activityEvents: { type: Array }
    };
  }

  constructor() {
    super();
    this.businessRules = {};
    this.minute = 60000; // multiply to 1 minute
    this.escapeKey = false;
    this.noActivity = true;
  }

  reset() {
    super.reset()
    this.nonProc = true
  }

  // Override this method once authorized
  authorized() {
    super.authorized()
    if (this.config.local) {
      this.businessRules = this.config.businessRules
    } else {
      this.businessRules = JSON.parse(sessionStorage.getItem("userSession")).platform_business_rules
    }
    this.enterSession()
    // An array of DOM events that should be interpreted as
    // user activity.
    this.activityEvents = [ 'mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart' ]
    // add these events to the document.
    // register the activity function as the listener parameter.
    // https://stackoverflow.com/questions/10444077/javascript-removeeventlistener-not-working
    // bind(this) will change the signature. So always assign the function to a var after binding this to using function bind API so that same var can be used in removeListener
    this.getEvent = this.getEvent.bind(this)
    this.activityEvents.forEach(eventName => {
      document.addEventListener(eventName, this.getEvent, { once: true })
    })
  }

  getEvent(evt) {
    this.noActivity = false
    setTimeout(() => {
      this.enterSession(evt)
    }, 1000)
  }

  enterSession(e) {
    if (e) {
      document.addEventListener(e.type, this.getEvent, { once: true })
    }
    this.noActivity = true
    // clear out the timeout if exist to stop the previous interval
    if (this.cTimer) {
      clearTimeout(this.cTimer);
    }
    if (this.sTimer) {
      clearTimeout(this.sTimer);
    }
    if (this.lTimer) {
      clearTimeout(this.lTimer);
    }
    this.attempt = 0
    this.startSession = new Date().getTime()
    this.newSession = new Date().getTime()
    if (Number(this.businessRules.minsLockSession) > 0 || Number(this.businessRules.minsLogoutSession) > 0) {
      this.checkTimer()
    }
    this.checkSessionExpired()
  }

  checkTimer() {
    if (this.noActivity) {
      let curTime = new Date().getTime();
      let runSession = curTime - this.startSession;
      if (this.businessRules.showTimingInConsole) {
        console.log(`timer checker: ${Math.round(runSession/1000)}s`)
      }
      this.cTimer = setTimeout(() => {
        this.checkTimer()
      }, Number(this.businessRules.secondsNextTimeChecker) * 1000)
    }
  }

  /**
   * Checking the user session inactivity
   */
  checkSessionExpired() {
    if (this.noActivity) {
      console.log("checkingSesssionExpired")
      let curTime = new Date().getTime();
      let runSession = curTime - this.startSession;
      if (!this.businessRules.enableLockSession || Number(this.businessRules.minsLockSession) < 1) {
        if (this.businessRules.enableLogoutSession && Number(this.businessRules.minsLogoutSession) > 0) {
          this.newSession = new Date().getTime()
          this.checkUserRelogin()
        }
      } else {
        if (runSession >= Number(this.businessRules.minsLockSession) * this.minute) { // session running >= minsLockSession
          // remove these events from the document.
          this.activityEvents.forEach(eventName => {
            document.removeEventListener(eventName, this.getEvent, { once: true })
          })

          // open relogin dialog
          this.type = "user"
          this.credsChecker("TOKEN_VALIDATE_USER_CREDENTIALS", -1)
          if (this.businessRules.enableLogoutSession && Number(this.businessRules.minsLogoutSession) > 0) {
            this.newSession = new Date().getTime()
            this.checkUserRelogin()
          } else {
            // clear out the timeout if exist to stop the previous time checker
            if (this.cTimer) {
              clearTimeout(this.cTimer);
            }
          }
        } else {
          this.sTimer = setTimeout(() => {
            this.checkSessionExpired()
          }, Number(this.businessRules.secondsNextTimeChecker) * 1000)
        }
      }
    }
  }

  /**
   * Waiting for relogin action, force logout if no relogin activity
   */
  checkUserRelogin() {
    if (this.noActivity) {
      console.log("checkingUserRelogin")
      let curTime = new Date().getTime();
      let runSession = curTime - this.newSession;
      if (runSession >= Number(this.businessRules.minsLogoutSession) * this.minute) { // session running >= minsLogoutSession
        // should logout
        this.logout()
      } else {
        // set the timeout object
        this.lTimer = setTimeout(() => {
          this.checkUserRelogin()
        }, Number(this.businessRules.secondsNextTimeChecker) * 1000)
      }
    }
  }

  fetchApi(urlParams) {
    return super.fetchApi(urlParams, false)
  }

  nextRequest() {
    super.nextRequest()
    this.dispatchEvent(new CustomEvent('success', {
      detail: { message_en: "Start sew session succeed", message_es: "Iniciar nueva sesión correctamente" },
      bubbles: true,
      composed: true
    }))
    this.enterSession()
  }

  failedAttempt() {
    super.failedAttempt()
    this.logout()
  }

  logout() {
    this.dispatchEvent(new CustomEvent('logout'))
  }
}