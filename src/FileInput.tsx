const FileInput = (props: { onFileSelected: (file: File) => void }) => {

    const onFileChanged = (file?: File) => {
        if (file) {
            props.onFileSelected(file)
        }
    }

    return (
        <input
            type="file"
            onChange={e => {
                onFileChanged(e.target.files ? e.target.files[0] : undefined)
            }}
        />
    )
}

export default FileInput
