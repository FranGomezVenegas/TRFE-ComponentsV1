import { css } from 'lit';
import { Layouts, Alignment } from '@collaborne/lit-flexbox-literals';

export const mapWithIconsStyles = [
  Layouts,
  Alignment,
  css`
    .mapWrap {
      position: relative;
      height: 1040px;
      width: 850px;
    }
    .mapWrap .mapImg {
      width: 100%;
    }
    .mapWrap .mapIcon {
      position: absolute;
      cursor: pointer;
    }
  `
];
