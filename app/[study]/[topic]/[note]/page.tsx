export default async function Note({params}: {params: {note: string}}) {
  // make note editable and patch existing database entry on save
  const {note} = await params;

  return (
    <div>Overview of the note: {note.toUpperCase()}</div>
  )
}