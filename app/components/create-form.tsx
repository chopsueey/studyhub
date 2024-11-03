"use client";

export default function CreateForm({
  action,
  what,
}: {
  action: (formData: FormData) => void;
  what: string;
}) {
  return (
    <form action={action} className="space-x-2">
      <input name="name" type="text" />
      <button type="submit">Create new {what}.</button>
    </form>
  );
}
