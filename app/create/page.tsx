import QuillEditor from "../components/quill-editor";
import Test from "../components/test";

export default function Create() {
  return (
    <div className="max-w-screen-md m-auto flex justify-center">
      <QuillEditor />
      <Test />
    </div>
  );
}
