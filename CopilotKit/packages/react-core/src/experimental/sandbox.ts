/**
 * This implements a hypothetical software spec generator.
 * `input` would come from a text input.
 *
 * Real agents that actually work in the context of an application with the agent API.
 */

import { useAgent } from "./agent";

const { extract, estimate, decide, generate } = useAgent();

const input = "A rails app that lets you manage your todo list";

interface Module {
  title: string;
  description: string;
  tasks: Task[];
}

interface Task {
  title: string;
  description: string;
  estimateInDays: number;
}

const modules = extract<Module>(
  "To generate a software spec for this task, split it into different modules.",
  {
    title: "The title of the module, used as headline in the final spec",
    description: "A one paragraph description of the module",
  },
  input,
);

// the for loop could be streamed
for (let module of modules) {
  module.tasks = [];

  const MAX_ITERATIONS = 3;
  for (let i = 0; i < MAX_ITERATIONS; i++) {
    const newTasks = extract<Task>(
      `To generate a software spec for this module, split it into different tasks.`,
      {
        title: "The title of the specific task, used as sub headline in the final spec",
      },
      module,
    );
    module.tasks.push(...newTasks);

    if (
      decide(`To generate a software spec for this module, are there any more tasks?`, module) ===
      false
    ) {
      break;
    }
  }

  for (let task of module.tasks) {
    task.description = generate(
      `To generate a software spec for this task, describe it in two paragraphs.`,
    );

    task.estimateInDays = estimate(
      `To generate a software spec for this task, estimate the time it will take to complete it.`,
    );
  }
}
