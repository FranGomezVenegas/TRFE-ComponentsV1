import { html } from 'lit-element';
import '@material/mwc-icon';
export const template = (props, lang) => {    
    if (props.data.stages===undefined){return html``}
    return html`
    <style>
        *, *:before, *:after{ 
            box-sizing: border-box; 
            -moz-box-sizing: border-box; 
            -webkit-box-sizing: border-box; 
        } 
        .selectedbar {
            font-family: Montserrat;
            position: relative; 
            height: 28px; 
            width: 240px; 
            padding: 0px; 
            -webkit-transform: rotate(0deg) skew(0deg); 
            transform: rotate(0deg) skew(0deg); 
            border-left: 14px solid transparent; 
            border-right: 14px solid rgb(36, 192, 235); 
            border-bottom: 14px solid rgb(36, 192, 235); 
            border-top: 14px solid rgb(36, 192, 235); 
            text-align: center;
            line-height: 0px;
            z-index: 4;
            font-weight: bold;
        }

        .selectedbar::after {
            content: '';
            position: absolute;
            border-top: 14px solid transparent;
            border-bottom: 14px solid transparent;
            border-left: 14px solid rgb(36, 192, 235);
            right: -28px;
            top: -14px;
            font-weight: bold;
        }

        .bar1 {
            position: relative; 
            height: 28px; 
            width: 240px; 
            padding: 0px; 
            -webkit-transform: rotate(0deg) skew(0deg); 
            transform: rotate(0deg) skew(0deg); 
            border-left: 14px solid transparent; 
            border-right: 14px solid rgb(23, 162, 184); 
            border-bottom: 14px solid rgb(23, 162, 184); 
            border-top: 14px solid rgb(23, 162, 184); 
            text-align: center;
            line-height: 0px;
            z-index: 4;
        }

        .bar1::after {
            content: '';
            position: absolute;
            border-top: 14px solid transparent;
            border-bottom: 14px solid transparent;
            border-left: 14px solid rgb(23, 162, 184);
            right: -28px;
            top: -14px;
        }

        .bar2 {
            position: relative; 
            height: 28px; 
            width: 240px; 
            padding: 0px; 
            -webkit-transform: rotate(0deg) skew(0deg); 
            transform: rotate(0deg) skew(0deg); 
            border-left: 14px solid transparent; 
            border-right: 14px solid rgb(40, 167, 69); 
            border-bottom: 14px solid rgb(40, 167, 69); 
            border-top: 14px solid rgb(40, 167, 69); 
            text-align: center;
            line-height: 0px;
            z-index: 3;
        }

        .bar2::after {
            content: '';
            position: absolute;
            border-top: 14px solid transparent;
            border-bottom: 14px solid transparent;
            border-left: 14px solid rgb(40, 167, 69);
            right: -28px;
            top: -14px;
        }

        .bar3 {
            position: relative; 
            height: 28px; 
            width: 240px; 
            padding: 0px; 
            -webkit-transform: rotate(0deg) skew(0deg); 
            transform: rotate(0deg) skew(0deg); 
            border-left: 14px solid transparent; 
            border-right: 14px solid rgb(220, 53, 69); 
            border-bottom: 14px solid rgb(220, 53, 69); 
            border-top: 14px solid rgb(220, 53, 69); 
            text-align: center;
            line-height: 0px;
            z-index: 2;
        }

        .bar3::after {
            content: '';
            position: absolute;
            border-top: 14px solid transparent;
            border-bottom: 14px solid transparent;
            border-left: 14px solid rgb(220, 53, 69);
            right: -28px;
            top: -14px;
        }

        .bar4 {
            position: relative; 
            height: 28px; 
            width: 240px; 
            padding: 0px; 
            -webkit-transform: rotate(0deg) skew(0deg); 
            transform: rotate(0deg) skew(0deg); 
            border-left: 14px solid transparent; 
            border-right: 14px solid rgb(253, 126, 20); 
            border-bottom: 14px solid rgb(253, 126, 20); 
            border-top: 14px solid rgb(253, 126, 20); 
            text-align: center;
            line-height: 0px;
            z-index: 2;
        }

        .bar4::after {
            content: '';
            position: absolute;
            border-top: 14px solid transparent;
            border-bottom: 14px solid transparent;
            border-left: 14px solid rgb(253, 126, 20);
            right: -28px;
            top: -14px;
        }

        .stages-bar {
            display: flex;
            flex-direction: row;
            gap: 4px;
        }

        .unactive-bar {
            font-family: Montserrat;
            position: relative; 
            height: 28px; 
            width: 240px; 
            padding: 0px; 
            -webkit-transform: rotate(0deg) skew(0deg); 
            transform: rotate(0deg) skew(0deg); 
            border-left: 14px solid transparent; 
            border-right: 14px solid #dddddd; 
            border-bottom: 14px solid #dddddd; 
            border-top: 14px solid #dddddd; 
            text-align: center;
            line-height: 0px;
            z-index: 2;
        }

        .unactive-bar::after {
            content: '';
            position: absolute;
            border-top: 14px solid transparent;
            border-bottom: 14px solid transparent;
            border-left: 14px solid #dddddd;
            right: -28px;
            top: -14px;
        }

    </style>
    <div class="stages-bar">
        ${props.data.stages.map((curData, i) => 
            i != props.data.currentState ? 
                html `<div class="unactive-bar" style="color: gray;"> ${getLabel(curData, lang)} </div>` :
                html `<div class="selectedbar" style="color: white;"> ${getLabel(curData, lang)} </div>`
        )}
    </div>
    `;
    function getLabel(curData, lang){
        console.log(lang)
        if (curData["label_"+lang]===undefined){
            return curData.name
        }
        return curData["label_"+lang]
    }
};
