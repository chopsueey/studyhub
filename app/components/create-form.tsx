"use client";

// there must be a better way to write this

export default function CreateForm({
  action,
  what,
  param,
  id,
}: ServerActionsForm) {
  const callback = (formData: FormData) => {
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
  };

  return (
    <div className="w-fit p-2 rounded-lg bg-green-500/80 hover:bg-green-500">
      <form action={callback} className="space-x-2">
        <input name="name" type="text" minLength={3} />
        <button type="submit">Create new {what}</button>
      </form>
    </div>
  );
}

type ServerActionsForm =
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
    };
