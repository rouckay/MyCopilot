// TODO add functions and probably global context

import { AnnotatedFunction } from "@copilotkit/shared";
import { CopilotContextParams } from "../context";

export interface ExtractParams {
  /**
   * The schema to use for the task.
   */
  schema: any;
  /**
   * The instructions to be given to the assistant.
   */
  instructions?: string;
  /**
   * The data to use for the task.
   */
  data?: any;
}

function extract<T = any>(params: ExtractParams): T[] {
  throw new Error("Not implemented");
}

export interface EstimateParams {
  /**
   * The instructions to be given to the assistant.
   */
  instructions: string;
  /**
   * The data to use for the task.
   */
  data?: any;
}

function estimate(params: EstimateParams): number {
  throw new Error("Not implemented");
}

export interface DecideParams {
  /**
   * The instructions to be given to the assistant.
   */
  instructions: string;
  /**
   * The data to use for the task.
   */
  data?: any;
  /**
   * The choices to choose from.
   */
  choices?: string[];
}

function decide(params: DecideParams): boolean;
function decide(params: DecideParams & { choices: string[] }): string[];
function decide(params: DecideParams): boolean | string[] {
  throw new Error("Not implemented");
}

interface GenerateParams {
  /**
   * The instructions to be given to the assistant.
   */
  instructions: string;
  /**
   * The data to use for the task.
   */
  data?: any;
}

function generate(params: GenerateParams): string {
  throw new Error("Not implemented");
}

interface PlanParams {
  /**
   * The instructions to be given to the assistant.
   */
  instructions: string;
  /**
   * The data to use for the task.
   */
  data?: any;
}

function plan(params: PlanParams) {
  throw new Error("Not implemented");
}

interface PerformParams {
  /**
   * The instructions to be given to the assistant.
   */
  instructions: string;
  /**
   * The data to use for the task.
   */
  data?: any;
}

function perform(params: PerformParams) {
  throw new Error("Not implemented");
}

export interface CopilotAgentConfig {
  /**
   * The instructions to be given to the assistant.
   */
  instructions?: string;
  /**
   * The data to use for the task.
   */
  data?: any;
  /**
   * Function definitions to be sent to the API.
   */
  functions?: AnnotatedFunction<any[]>[];
  /**
   * Whether to include the copilot readable context in the task.
   */
  includeCopilotReadable?: boolean;

  /**
   * Whether to include functions defined via useMakeCopilotActionable in the task.
   */
  includeCopilotActionable?: boolean;
}

type AgentFunctionParams = {
  decide: typeof decide;
  extract: typeof extract;
  estimate: typeof estimate;
  generate: typeof generate;
  plan: typeof plan;
  perform: typeof perform;
};

type AgentFunction = (params: AgentFunctionParams) => Promise<any> | any;

export class CopilotAgent {
  constructor(config?: CopilotAgentConfig) {}

  async run(context: CopilotContextParams, agent: AgentFunction): Promise<void> {}
}
