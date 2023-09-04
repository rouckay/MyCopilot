import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import React from "react";

export type EditTextFunctionRaw = (
  editorState: EditorState,
  editingPrompt: string
) => Promise<string>;

export interface EditorState {
  beforeSelection: string;
  selection: string;
  afterSelection: string;
}

export interface Props {
  editorState: EditorState;
  editFunction: EditTextFunctionRaw;
  performEdit: (insertedText: string) => void;
}

export function HoveringEditingPromptBox(props: Props) {
  const [editPrompt, setEditPrompt] = React.useState("");

  const [editSuggestion, setEditSuggestion] = React.useState<string | null>(
    null
  );
  const [loading, setLoading] = React.useState(false);

  return (
    <div className=" flex items-center space-x-4 rounded-md border w-[380px] bg-white shadow-lg px-4 py-4 border-neutral-300">
      <div className="grid w-full gap-1.5">
        <Label htmlFor="message-2">Your Message</Label>
        <Textarea
          value={editPrompt}
          onChange={(e) => setEditPrompt(e.target.value)}
          placeholder="Type your message here."
          id="message-2"
        />

        {!editSuggestion && (
          <Button
            onClick={async () => {
              setLoading(true);
              const editedText = await props.editFunction(
                props.editorState,
                editPrompt
              );
              setEditSuggestion(editedText);
              setLoading(false);
            }}
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </Button>
        )}
        {loading && (
          <p className="text-sm text-muted-foreground">
            Editing in progress...
          </p>
        )}

        {editSuggestion && (
          <div className="border border-neutral-300 rounded-md p-4">
            <p className="text-sm text-muted-foreground">{editSuggestion}</p>

            <Button
              onClick={() => {
                props.performEdit(editSuggestion);
                setEditSuggestion(null);
              }}
            >
              Accept
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}