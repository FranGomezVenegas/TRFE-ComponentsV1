export function FeaturesDynamicFieldValue(base) {
  return class extends (base) {

      getDynamicData(curTip, data, lang) {
          let templateString = curTip["text"];
          if (curTip["text_" + lang] !== undefined) {
              templateString = curTip["text_" + lang];
          }
          return this.replaceTagsInDynamicValue(templateString, data);
      }

      replaceTagsInDynamicValue(templateString, data) {
          if (templateString === undefined) {
              return '';
          }
          const regex = /\{(fld|variable)\:(\w+)\}|\{(fld|variable)\?(\w+)(?:\s*(==|!=)\s*(['"]?.+['"]?))?\s*\?\s*([^:}]+)\s*:\s*([^}]+)\}/g;
          return templateString.replace(regex, (match, type, key, condType, condKey, operator, comparisonValue, truePart, falsePart) => {
              if (type && key) {
                  return this.simpleReplacement(type, key, data, match);
              } else if (condType && condKey) {
                  return this.evaluateExpression(data, condType, condKey, truePart, falsePart, comparisonValue, operator);
              }
              return match;
          });
      }

      simpleReplacement(type, key, data, match) {
          if (type === 'fld') {
              return data[key] !== undefined ? data[key] : match;
          }
          return match;
      }

      evaluateExpression(data, type, key, truePart, falsePart, comparisonValue, operator) {
          try {
              const value = type === 'fld' ? data[key] : this.variable[key];
              if (comparisonValue !== undefined) {
                  const match = (operator === '==' && value === comparisonValue.replace(/['"]/g, '')) ||
                                (operator === '!=' && value !== comparisonValue.replace(/['"]/g, ''));
                  if (match) {
                      return this.replaceTagsInDynamicValue(truePart, data);
                  } else {
                      return this.replaceTagsInDynamicValue(falsePart, data);
                  }
              }

              if (value) {
                  return this.replaceTagsInDynamicValue(truePart, data);
              } else {
                  return this.replaceTagsInDynamicValue(falsePart, data);
              }
          } catch (e) {
              console.error("Error evaluating expression: ", e);
              return '';
          }
      }
  }
}
