// TODO add functions and probably global context

function extract<T = any>(instructions: string, schema: any, data: any): T[] {
  throw new Error("Not implemented");
}

function estimate(instructions: string, data?: any): number {
  throw new Error("Not implemented");
}

function decide(instructions: string, data?: any): boolean;
function decide(instructions: string, options: { choices: string[] }, data?: any): string;

function decide(instructions: string, dataOrOptions: any, maybeData?: any): boolean | string {
  throw new Error("Not implemented");
}

function generate(instructions: string, data?: any): string {
  throw new Error("Not implemented");
}

export function useAgent() {
  return {
    extract,
    estimate,
    decide,
    generate,
  };
}
