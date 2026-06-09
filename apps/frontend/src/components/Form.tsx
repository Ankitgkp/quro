import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { BACKEND_URL } from "@/lib/config";
import axios from "axios";

export function Form() {
  const [github, setGithub] = useState("");

  async function onSubmit() {
    if (!github) {
      toast("Please provide valid and linkedin and github urls");
      return;
    }

    await axios.post(`${BACKEND_URL}/api/v1/pre-interview`, {
      github,
    });
  }

  return (
    <div>
      <div className="h-screen w-screen flex justify-center items-center">
        <div>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            AI Interview
          </h2>
          <div className="flex ">
            <Input
              placeholder="Github URL"
              onChange={(e) => setGithub(e.target.value)}
            ></Input>
            <div className="flex justify-center items-center gap-4">
              <Button onClick={onSubmit}>Start Interview</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
