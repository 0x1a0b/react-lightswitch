import json from './schemaMock.json';

export function GetMockName() {
    return json.name
}

export function GetMockSchema() {
    return json.diagram
}
export function GetMockSchemaSize() {
    return json.height
}
