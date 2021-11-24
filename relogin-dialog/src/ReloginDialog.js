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
      this.microConv = 1000 // multiply to 1s for local test
    } else {
      this.businessRules = JSON.parse(sessionStorage.getItem("userSession")).platform_business_rules
    }
    this.checkSessionExpired()
  }

  /**
   * Checking the user session inactivity
   */
  checkSessionExpired() {
    console.log("checkingSesssionExpired")
    // clear out the timeout if exist to stop the previous interval
    if (this.timer) {
      clearTimeout(this.timer);
    }
    let curTime = new Date().getTime();
    let runSession = curTime - this.startSession;
    if (runSession >= this.businessRules.minsLockSession * this.microConv) { // session running >= minsLockSession
      // open relogin dialog
      this.credsChecker("TOKEN_VALIDATE_USER_CREDENTIALS")
      if (this.businessRules.enableLogoutSession) {
        this.newSession = new Date().getTime()
        return this.checkUserRelogin()
      } else {
        return
      }
    }
    setTimeout(() => {
      this.checkSessionExpired()
    }, this.businessRules.secondsNextTimeChecker * this.microConv)
  }

  /**
   * Waiting for relogin action, force logout if no relogin activity
   */
  checkUserRelogin() {
    console.log("checkingUserRelogin")
    let curTime = new Date().getTime();
    let runSession = curTime - this.newSession;
    if (runSession >= this.businessRules.minsLogoutSession * this.microConv) { // session running >= minsLogoutSession
      // should logout
      this.logout()
    } else {
      // set the timeout object
      this.timer = setTimeout(() => {
        this.checkUserRelogin()
      }, this.businessRules.secondsNextTimeChecker * this.microConv)
    }
  }

  /**
   * once relogin succeed
   */
  reloginSucceed() {
    this.attempt = 0
    this.startSession = new Date().getTime()
    this.newSession = new Date().getTime()
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