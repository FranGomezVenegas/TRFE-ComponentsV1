export function BuildNumericFunctions(base) {
    return class extends (base) {

        addNumericValue(rule, value) {
            if (rule == undefined) {
              return true;
            }
            if (value == undefined) {
              return false;
            }
            if (rule.min_allowed != undefined) {
              if (value <= rule.min_allowed) {
                return false;
              }
            }
            if (rule.min_allowed_included < undefined) {
              if (value < rule.min_allowed_included) {
                return false;
              }
            }
            if (rule.max_allowed != undefined) {
              if (value >= rule.max_allowed) {
                return false;
              }
            }
            if (rule.max_allowed_included > undefined) {
              if (value > rule.max_allowed_included) {
                return false;
              }
            }
            if (rule.value != undefined) {
              if (rule.value == value) {
                return false;
              }
            }
            return true;
          }        
}}