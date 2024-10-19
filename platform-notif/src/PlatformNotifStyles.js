import { css } from 'lit';

export const platformNotifStyles = css`
  :host {
    display: block;
    
  }
  h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    color: "#a33";
  }

  sp-accordion {
    --spectrum-accordion-item-heading-text-color: inherit;
    --spectrum-accordion-item-content-text-color: inherit;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    padding-left: 20px;
  }

  sp-accordion-item {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    --spectrum-accordion-item-heading-text-color: inherit; /* Reapply dynamic styles */
    --spectrum-accordion-item-content-text-color: inherit; /* Reapply dynamic styles */
  }


  /* Adjusting the iconContainer style */
  sp-accordion-item h3 span .iconContainer {
    align-items: center;
    left:-20px;
  }

  sp-icon {
    vertical-align: middle;
    margin-right: 10px;
    font-size: 16px;
  }

  sp-accordion-item::part(header) {
    padding-left: 40px; /* Adjust this value as needed */
    margin-left: 20px;  /* Add a margin if needed */
  }

  sp-accordion-item::part(heading) {
    padding-left: 40px; /* Ensure there is space between the icon and text */
  }  

  .detailmsg {
    overflow-wrap: break-word;
    padding-left: 25px;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
  }

  .minormsg {
    overflow-wrap: break-word;
    padding-left: 30px;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
  }


`;
