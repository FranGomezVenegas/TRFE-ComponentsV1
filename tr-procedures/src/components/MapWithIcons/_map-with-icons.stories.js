import { html } from 'lit';
import './map-with-icons-index';

export default {
  title: 'Components/Map With Icons',
  component: 'map-with-icons-index',
};

const Template = ({ samplePoints, mapUrl, lang }) => html`
  <map-with-icons
    .samplePoints=${samplePoints}
    .mapUrl=${mapUrl}
    .lang=${lang}
  ></map-with-icons>
`;

export const Default = Template.bind({});
Default.args = {
  samplePoints: [
    { map_icon: '/MapWithButtons/1.png', map_icon_top: '177.125px', map_icon_left: '512px', map_icon_w: '34', map_icon_h: '30' },
    { map_icon: '/MapWithButtons/labplanet.png', map_icon_top: '383.125px', map_icon_left: '689px', map_icon_w: '34', map_icon_h: '30' },
  ],
  mapUrl: '/MapWithButtons/clean-room-example2.webp',
  lang: 'en',
};
