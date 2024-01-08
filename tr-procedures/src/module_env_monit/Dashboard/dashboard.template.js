import { html } from 'lit-element';

export const template = (props) => {
    let index = 0;
    return html`
        <svg
        class="container primary"
        viewBox="0 0 1200 600"
        xmlns="http://www.w3.org/2000/svg"
        >
        <text x="100" y="180" class="up-title">${props.params.title1}</text>
        <text x="100" y="420" class="lo-title">${props.params.title2}</text>
        ${props.params.nodes.map((node, i) => html`
            <svg
            class="container primary"
            viewBox="0 0 1200 600"
            xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx=${index * 200 + 30} cy="300" r="20" />
                <circle cx=${index * 200 + 170} cy="300" r="20" />
                <circle class="sample" cx=${index * 200 + 100} cy="300" r="70" @click=${() => props.elementClicked(node.viewName, node.filterName)}> </circle>
                <text x=${index * 200 + 100} y="300" @click=${() => props.elementClicked(node.viewName, node.filterName)}>${node.title}</text>

                <path d="M ${i < props.params.nodes.length - 1 ? index * 200 + 170 : -100} 300 q 15 -60 60 -100" fill="none" />
                <path d="M ${i < props.params.nodes.length - 1 ? index * 200 + 170 : -100} 300 q 15 60 60 100" fill="none" />

                <rect x=${i < props.params.nodes.length - 1 ? index * 200 + 220 : -100} y="300" width=${props.params.leaves[i] ? props.params.leaves[i].group1.length * 200 - 50 : null} height="10" />

                ${++index}
                ${props.params.leaves[i] ? props.params.leaves[i].group1.map((item, k) => html `
                    <svg
                    class="container primary"
                    viewBox="0 0 1200 600"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx=${index * 200 + 30} cy="200" r="20" />
                        <circle cx=${index * 200 + 170} cy="200" r="20" />
                        <circle class="results" cx=${index * 200 + 100} cy="200" r="70" @click=${() => props.elementClicked(item.viewName, item.filterName)}> </circle>
                        <text x=${index * 200 + 100} y="200" class="text-orange" @click=${() => props.elementClicked(item.viewName, item.filterName)}>${item.title}</text>

                        <rect x=${ k > 0 ? (index - 1) * 200 + 190 : -100} y="195" width="20" height="10" />

                        <circle cx=${index * 200 + 30} cy="400" r="20" />
                        <circle cx=${index * 200 + 170} cy="400" r="20" />
                        <circle class="results" cx=${index * 200 + 100} cy="400" r="70"  @click=${() => props.elementClicked(props.params.leaves[i].group2[k].viewName, props.params.leaves[i].group2[k].filterName)}></circle>
                        <text x=${index * 200 + 100} y="400" class="text-blue" @click=${() => props.elementClicked(props.params.leaves[i].group2[k].viewName, props.params.leaves[i].group2[k].filterName)}>${props.params.leaves[i].group2[k].title}</text>
                        
                        <rect x=${ k > 0 ? (index - 1) * 200 + 190 : -100} y="395" width="20" height="10" />

                        ${++index}
                    </svg>
                `): null}
                <path d="M ${i < props.params.nodes.length - 1 ? (index - 1) * 200 + 185 : -100} 200 q 15 -30 60 100" fill="none" />
                <path d="M ${i < props.params.nodes.length - 1 ? (index - 1) * 200 + 185 : -100} 400 q 15 30 60 -100" fill="none" />
            </svg>
        `)}
        </svg>
    `;
};
