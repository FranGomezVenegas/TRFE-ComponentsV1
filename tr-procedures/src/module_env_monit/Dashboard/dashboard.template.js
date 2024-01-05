import { html } from 'lit-element';

export const template = (props) => {
    return html`
    <svg
    class="container primary"
    viewBox="0 0 1200 600"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M 170 300 q 15 -60 60 -100" fill="none" />
    <path d="M 170 300 q 15 60 60 100" fill="none" />

    <path d="M ${(props.params.groups[0].items.length) * 200 + 170} 200 q 15 -30 60 100" fill="none" />
    <path d="M ${(props.params.groups[0].items.length) * 200 + 170} 400 q 15 30 60 -100" fill="none" />

    <rect x="250" y="300" width=${(props.params.groups[0].items.length - 1) * 200 + 100} height="10" />

    <circle cx="30" cy="300" r="20" />
    <circle cx="170" cy="300" r="20" />
    <circle class="sample" cx="100" cy="300" r="70"/>
    <text x="100" y="300" >${props.params.start.title}</text>

    <circle cx=${(props.params.groups[0].items.length) * 200 + 230} cy="300" r="20" />
    <circle cx=${(props.params.groups[0].items.length) * 200 + 370} cy="300" r="20" />
    <circle class="sample" cx=${(props.params.groups[0].items.length) * 200 + 300} cy="300" r="70"/>
    <text x=${(props.params.groups[0].items.length) * 200 + 300} y="300">${props.params.end.title}</text>

    ${props.params.groups.map((data, k) => html `
        <svg
        class="container primary"
        viewBox="0 0 1200 600"
        xmlns="http://www.w3.org/2000/svg"
        >
            <text x="100" y=${k * 240 + 180} class=${k > 0 ? "lo-title" : "up-title"}>${data.title}</text>
            ${data.items.map((item, i) => html `
                <svg
                class="container primary"
                viewBox="0 0 1200 600"
                xmlns="http://www.w3.org/2000/svg"
                >
                    <rect x=${ i ? 390 + (i - 1) * 200 : -100 } y=${195 + k * 200} width="30" height="10" />
 
                    <circle cx=${230 + i * 200} cy=${200 + k * 200} r="20" />
                    <circle cx=${370 + i * 200} cy=${200 + k * 200} r="20" />
                    <circle class="results" cx=${300 + i * 200} cy=${200 + k * 200} r="70"}/>
                    <text x=${300 + i * 200} y=${200 + k * 200} class=${k > 0 ? "text-blue" : "text-orange"}>${item.title}</text>
                </svg>
            `)}
        </svg>
    `)}   

  </svg>
    `;
};
