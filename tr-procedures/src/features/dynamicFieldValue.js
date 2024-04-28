export function FeaturesDynamicFieldValue(base) {
    return class extends (base) {

        getDynamicData(curTip, data, lang) {
            let templateString = curTip["text"]
            if (curTip["text_" + lang] !== undefined) {
              templateString = curTip["text_" + lang];
            }  
            //console.log('lang', lang, templateString)
            return this.replaceTagsInDynamicValue(templateString, data)
        }        
        replaceTagsInDynamicValue(templateString, data) {
            if (templateString===undefined){return''}
            const regex = /\{(fld|variable)\?(\w+)(?:(?:\s*==\s*(['"]?.+['"]?))?\s*\?\s*(['"]?[^:'"]+['"]?)\s*:\s*(['"]?[^}]+['"]?)|([^}]+))\}|{(fld|variable):(\w+)\}/g;
            return templateString.replace(regex, (match, type, key, comparisonValue, truePart, falsePart, switchCases, simpleType, simpleKey) => {
              if (type && key) {
                // Handle conditional expression
                return this.evaluateExpression(data, type, key, truePart, falsePart, comparisonValue, switchCases);
              } else if (simpleType) {
                // Handle simple replacement
                return simpleType === 'fld' ? data[simpleKey] ?? match : this.variable[simpleKey] ?? match;
              }
              return match;
            });
          }   
        evaluateExpression(data, type, key, truePart, falsePart, comparisonValue, switchCases) {
            try {
              const value = type === 'fld' ? data[key] : this.variable[key];
          
              // Handling switch-like expressions
              if (switchCases) {
                const cases = switchCases.split(/\s*:\s*/);
                for (let i = 0; i < cases.length; i += 1) {
                    //const caseValue = cases[i]?.trim().replace(/['"]/g, '');
                    //const caseResult = cases[i + 1]?.trim();          
                    const parts = cases[i].split('?');
                    const caseValue = parts[0];
                    const caseResult = parts[1];
                    if (caseValue === value){// || (i === cases.length - 1 && caseResult !== null)) {
                        return caseResult;
                    }
                }
                return cases[cases.length-1]; // Default case if no match
              }
          
              // Handling comparison expressions
              if (comparisonValue !== undefined) {
                const match = value === comparisonValue.replace(/['"]/g, '');
                return match ? truePart : falsePart;
              }
          
              // Handling boolean values
              return value ? truePart : falsePart;
            } catch (e) {
              console.error("Error evaluating expression: ", e);
              return ''; // Return a default value or handle the error as needed
            }
          }
          
     
    }
}