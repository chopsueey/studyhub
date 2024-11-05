"use client";

// there must be a better way to write this
export default function CreateForm({
  action,
  what,
  param,
  id,
}:
  | {
      action: (formData: FormData) => Promise<void>;
      what: string;
      param?: string;
      id?: string;
    }
  | {
      action: (formData: FormData, param: string, id: string) => Promise<void>;
      what: string;
      param: string;
      id: string;
    }) {
  return (
    <form
      action={(formData: FormData) => {
        if (!param || !id) {
          (action as (formData: FormData) => Promise<void>)(formData);
        } else {
          (
            action as (
              formData: FormData,
              param: string,
              id: string
            ) => Promise<void>
          )(formData, param, id);
        }
      }}
      className="space-x-2"
    >
      <input name="name" type="text" />
      <button type="submit">Create new {what}.</button>
    </form>
  );
}
