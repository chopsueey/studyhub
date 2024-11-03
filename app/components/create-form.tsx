"use client";

export default function CreateForm({action, what, study}: {
  action: (formData: FormData, study?: string) => void;
  what: string;
  study?: string;
}) {

  return (
    <form action={action} className="space-x-2">
      <input name="name" type="text" />
      <button type="submit">Create new {what}.</button>
    </form>
  );
}
