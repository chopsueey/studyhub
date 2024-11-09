import QuillEditor from "@/app/components/quill-editor";

export default function EditNote() {
  return (
    <div className="max-w-screen-md m-auto flex justify-center">
      <QuillEditor action={"edit"}/>
    </div>
  );
}
