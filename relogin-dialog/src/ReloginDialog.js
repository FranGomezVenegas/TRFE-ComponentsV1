import { html, css } from 'lit';
import { CredDialog } from '@trazit/cred-dialog';

export class ReloginDialog extends CredDialog {
  static get properties() {
    return {
      startSession: { type: Number },
      businessRules: { type: Boolean },
      microConv: { type: Number } // conversion number to micros
    };
  }

  constructor() {
    super();
    this.businessRules = {};
    this.microConv = 60000; // multiply to 1 minute
    this.escapeKey = false;
  }

  reset() {
    super.reset()
    this.nonProc = true

  }

  // Override this method once authorized
  authorized() {
    super.authorized()
    this.startSession = new Date().getTime()
    if (this.config.local) {
      this.businessRules = this.config.businessRules
    } else {
      this.businessRules = JSON.parse(sessionStorage.getItem("userSession")).platform_business_rules
    }
    if (Number(this.businessRules.minsLockSession) > 0 || Number(this.businessRules.minsLogoutSession) > 0) {
      this.checkTimer()
    }
    this.checkSessionExpired()
  }

  checkTimer() {
    let curTime = new Date().getTime();
    let runSession = curTime - this.startSession;
    if (this.businessRules.showTimingInConsole) {
      console.log(`timer checker: ${Math.round(runSession/1000)}s`)
    }
    this.cTimer = setTimeout(() => {
      this.checkTimer()
    }, Number(this.businessRules.secondsNextTimeChecker) * 1000)
  }

  /**
   * Checking the user session inactivity
   */
  checkSessionExpired() {
    console.log("checkingSesssionExpired")
    let curTime = new Date().getTime();
    let runSession = curTime - this.startSession;
    if (!this.businessRules.enableLockSession || Number(this.businessRules.minsLockSession) < 1) {
      if (this.businessRules.enableLogoutSession && Number(this.businessRules.minsLogoutSession) > 0) {
        this.newSession = new Date().getTime()
        this.checkUserRelogin()
      }
    } else {
      if (runSession >= Number(this.businessRules.minsLockSession) * this.microConv) { // session running >= minsLockSession
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
        setTimeout(() => {
          this.checkSessionExpired()
        }, Number(this.businessRules.secondsNextTimeChecker) * 1000)
      }
    }
  }

  /**
   * Waiting for relogin action, force logout if no relogin activity
   */
  checkUserRelogin() {
    console.log("checkingUserRelogin")
    let curTime = new Date().getTime();
    let runSession = curTime - this.newSession;
    if (runSession >= Number(this.businessRules.minsLogoutSession) * this.microConv) { // session running >= minsLogoutSession
      // should logout
      this.logout()
    } else {
      // set the timeout object
      this.timer = setTimeout(() => {
        this.checkUserRelogin()
      }, Number(this.businessRules.secondsNextTimeChecker) * 1000)
    }
  }

  /**
   * once relogin succeed
   */
  reloginSucceed() {
    // clear out the timeout if exist to stop the previous interval
    if (this.timer) {
      clearTimeout(this.timer);
    }
      if (this.cTimer) {
      clearTimeout(this.cTimer);
    }
    this.attempt = 0
    this.startSession = new Date().getTime()
    this.newSession = new Date().getTime()
    if (Number(this.businessRules.minsLockSession) > 0 || Number(this.businessRules.minsLogoutSession) > 0) {
      this.checkTimer()
    }
    this.checkSessionExpired()
  }

  nextRequest() {
    super.nextRequest()
    this.reloginSucceed()
  }

  failedAttempt() {
    super.failedAttempt()
    this.logout()
  }

  logout() {
    this.dispatchEvent(new CustomEvent('logout'))
  }
}