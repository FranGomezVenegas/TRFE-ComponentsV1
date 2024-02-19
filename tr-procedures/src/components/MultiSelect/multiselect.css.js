import { css } from "lit-element";

export const styles = css`
:host {

}
.sellect-container {
    border: 1px solid #ccc;
    padding: 5px 5px 0 5px;
    border-radius: 3px;
    margin-top: 5px;
    position: relative;
    background: #efefef;
}
.sellect-destination-list {
    display: inline-block;
    transform: translateY(-8px);
}
.sellect-destination-list .sellect-item {
    padding-top: 3px;
    padding-bottom: 0;
    font-size: 11px;
}
.sellect-destination-list .sellect-item {
    margin: 0 5px 5px 0;
    background-color: #e5e5e5;
    border: 1px solid #ccc;
    cursor: pointer;
    border-radius: 2px;
    padding: 8px 5px;
    text-align: center;
    line-height: 32px;
    display: inline-block;
}
.sellect-destination-list .sellect-item .sellect-close-icon {
    margin-left: 5px;
}
.sellect-element {
    border: none;
    height: 18px;
    background: none;
}
.sellect-element:focus-visible {
    outline-offset: 0px;
    outline: none;
}
.sellect-origin-list.open {
    max-height: 138px;
    opacity: 1;
}
.sellect-origin-list {
    overflow: auto;
    max-height: 0;
    opacity: 0;
    transition: opacity 1.1s ease, max-height .2s ease;
}
.sellect-origin-list .sellect-item {
    display: block;
    cursor: pointer;
    padding: 5px;
    border-radius: 3px;
    margin-right: 5px;
}
.sellect-arrow-icon {
    position: absolute;
    cursor: pointer;
    top: 0;
    right: 0;
    padding: 8px;
    transform: translateY(-3px);
}

label {
    font-weight: bold;
    color: rgb(24, 164, 254);
    font-family: Montserrat;
}
`