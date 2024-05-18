import { arrayTypes, arrayTypesAndValues, arrayValues } from "./types-and-values-array.js";
import {
    arrowFunctionTypes,
    arrowFunctionTypesAndValues,
    arrowFunctionValues,
} from "./types-and-values-arrow-function.js";
import { scalarTypes, scalarTypesAndValues, scalarValues } from "./types-and-values-scalar.js";
import { setTypes, setTypesAndValues, setValues } from "./types-and-values-set.js";

//----------------------------------------------------------------------------------------------------------------------
// Container
//----------------------------------------------------------------------------------------------------------------------

export const containerTypes = [...arrayTypes, ...setTypes] as const;
export const containerValues = [...arrayValues, ...setValues] as const;
export const containerTypesAndValues = [...arrayTypesAndValues, ...setTypesAndValues] as const;

//----------------------------------------------------------------------------------------------------------------------
// Scalar + arrow function
//----------------------------------------------------------------------------------------------------------------------

export const scalarAndArrowFunctionTypes = [...scalarTypes, ...arrowFunctionTypes] as const;
export const scalarAndArrowFunctionValues = [...scalarValues, ...arrowFunctionValues] as const;
export const scalarAndArrowFunctionTypesAndValues = [...scalarTypesAndValues, ...arrowFunctionTypesAndValues] as const;

//----------------------------------------------------------------------------------------------------------------------
// Scalar + container
//----------------------------------------------------------------------------------------------------------------------

export const scalarAndContainerTypes = [...scalarTypes, ...containerTypes] as const;
export const scalarAndContainerValues = [...scalarValues, ...containerValues] as const;
export const scalarAndContainerTypesAndValues = [...scalarTypesAndValues, ...containerTypesAndValues] as const;

//----------------------------------------------------------------------------------------------------------------------
// Arrow functions + container
//----------------------------------------------------------------------------------------------------------------------

export const arrowFunctionAndContainerTypes = [...arrowFunctionTypes, ...containerTypes] as const;
export const arrowFunctionAndContainerValues = [...arrowFunctionValues, ...containerValues] as const;
export const arrowFunctionAndContainerTypesAndValues = [
    ...arrowFunctionTypesAndValues,
    ...containerTypesAndValues,
] as const;

//----------------------------------------------------------------------------------------------------------------------
// Scalar + arrow function + container
//----------------------------------------------------------------------------------------------------------------------

export const types = [...scalarTypes, ...arrowFunctionTypes, ...containerTypes] as const;
export const values = [...scalarValues, ...arrowFunctionValues, ...containerValues] as const;
export const typesAndValues = [
    ...scalarTypesAndValues,
    ...arrowFunctionTypesAndValues,
    ...containerTypesAndValues,
] as const;
