import { ref } from 'vue'

export default function () {
    const files: any = ref([])

    function addFiles(newFiles: any) {
        let newUploadableFiles = [...newFiles]
            .map((file: any) => new UploadableFile(file))
            .filter((file: any) => !fileExists(file.id))
        files.value = [...files.value, ...newUploadableFiles]
    }

    function fileExists(otherId:string) {
        return files.value.some((file: any) => file.id === otherId)
    }

    function removeFile(file: never) {
        const index = files.value.indexOf(file)

        if (index > -1) files.value.splice(index, 1)
    }

    return { files, addFiles, removeFile }
}

class UploadableFile {
    file: any
    id: string
    url: string
    status: string | null
    constructor(file: any) {
        this.file = file
        this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`
        this.url = URL.createObjectURL(file)
        this.status = null
    }
}