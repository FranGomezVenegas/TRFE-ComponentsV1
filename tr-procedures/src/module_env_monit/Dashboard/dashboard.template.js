import { html } from 'lit-element';

export const template = (props) => {
    let index = 0;
    return html`
        <svg
        class="container primary"
        viewBox="0 0 1200 600"
        xmlns="http://www.w3.org/2000/svg"
        >
        <text x="100" y="180" class="up-title">${ props.lang == "en" ? props.params.title1_en : props.params.title1_es}</text>
        <text x="100" y="420" class="lo-title">${ props.lang == "en" ? props.params.title2_en : props.params.title2_es}</text>
        ${props.params.nodes.map((node, i) => html`
            <svg
            class="container primary"
            viewBox="0 0 1200 600"
            xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx=${index * 200 + 30} cy="300" r="20" />
                <circle cx=${index * 200 + 170} cy="300" r="20" />
                <circle class="sample" cx=${index * 200 + 100} cy="300" r="70" @click=${() => props.elementClicked(node.viewName, node.filterName)}> </circle>
                <text textLength="6em" x=${index * 200 + 100} y="300" @click=${() => props.elementClicked(node.viewName, node.filterName)}>${props.lang == "en" ? node.title_en : node.title_es}</text>
                
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
                        <text textLength="6em" x=${index * 200 + 100} y="200" class="text-orange" @click=${() => props.elementClicked(item.viewName, item.filterName)}>${props.lang == "en" ? item.title_en : item.title_es}</text>

                        <rect x=${ k > 0 ? (index - 1) * 200 + 190 : -100} y="195" width="20" height="10" />

                        <circle cx=${index * 200 + 30} cy="400" r="20" />
                        <circle cx=${index * 200 + 170} cy="400" r="20" />
                        <circle class="results" cx=${index * 200 + 100} cy="400" r="70"  @click=${() => props.elementClicked(props.params.leaves[i].group2[k].viewName, props.params.leaves[i].group2[k].filterName)}></circle>
                        <text textLength="6em" x=${index * 200 + 100} y="400" class="text-blue" @click=${() => props.elementClicked(props.params.leaves[i].group2[k].viewName, props.params.leaves[i].group2[k].filterName)}>${props.lang == "en" ? props.params.leaves[i].group2[k].title_en : props.params.leaves[i].group2[k].title_es}</text>
                        
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
