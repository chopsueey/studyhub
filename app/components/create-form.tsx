"use client";

export default function CreateForm({
  action,
  what,
  param,
}:
  | {
      action: (formData: FormData) => Promise<void>;
      what: string;
      param?: string;
    }
  | {
      action: (formData: FormData, param: string) => Promise<void>;
      what: string;
      param: string;
    }) {
  return (
    <form
      action={(formData: FormData) => {
        if (!param) {
          (action as (formData: FormData) => Promise<void>)(formData);
        } else {
          (action as (formData: FormData, param: string) => Promise<void>)(
            formData,
            param
          );
        }
      }}
      className="space-x-2"
    >
      <input name="name" type="text" />
      <button type="submit">Create new {what}.</button>
    </form>
  );
}
