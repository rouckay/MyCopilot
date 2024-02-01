/**
 * This implements a hypothetical software spec generator.
 * `input` would come from a text input.
 *
 * Real agents that actually work in the context of an application with the agent API.
 */

import { useCopilotContext } from "../context";
import { CopilotAgent } from "./agent";

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

const input = "A rails app that lets you manage your todo list";

const agent = new CopilotAgent({
  instructions: "Generate a software spec from the description provided by the user.",
  data: input,
});

agent.run(useCopilotContext(), async ({ decide, extract, estimate, generate }) => {
  // split the input into modules
  const modules = extract<Module>({
    instructions: "Extract modules to be used as top level headings in the final spec.",
    schema: {
      title: "The title of the module, used as headline in the final spec",
      description: "A one paragraph description of the module",
    },
  });

  for (let module of modules) {
    // for each module, extract tasks
    module.tasks = [];
    const MAX_ITERATIONS = 3;
    for (let i = 0; i < MAX_ITERATIONS; i++) {
      const tasks = extract<Task>({
        instructions: "Extract tasks for this module",
        schema: {
          title:
            "The title of the specific task, used as sub heading of the module in the final spec",
        },
        data: module,
      });
      module.tasks.push(...tasks);

      // do we want to extract more tasks?
      if (decide({ instructions: "Do the tasks fully cover this module?", data: module })) {
        break;
      }

      // generate a description and estimate for each task
      for (let task of module.tasks) {
        task.description = generate({
          instructions: "Describe the task in two paragraphs.",
          data: task,
        });

        task.estimateInDays = estimate({
          instructions: "Estimate the time it will take to complete the task.",
          data: task,
        });
      }
    }
  }
});
