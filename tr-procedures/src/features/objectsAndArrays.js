export function FeaturesObjectsAndArrays(base) {
    return class extends (base) {
        varObjorArrAsArray(input) {
            if (typeof input === 'object' && !Array.isArray(input)) {
                return [input];
            }
            return input;
        }       
    
    }
}