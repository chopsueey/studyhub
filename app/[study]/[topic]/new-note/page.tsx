import QuillEditor from "@/app/components/quill-editor";

export default async function NewNote({
  params,
}: {
  params: Promise<{ study: string; topic: string }>;
}) {
  const { study, topic } = await params;
  return (
    <div className="max-w-screen-md m-auto flex justify-center">
      <QuillEditor action={"create"} study={study} topic={topic} />
    </div>
  );
}
