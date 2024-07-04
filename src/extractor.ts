import * as pdfjs from 'pdfjs-dist'
import { TextItem } from 'pdfjs-dist/types/src/display/api';

export async function extractTextFromFile(file: File): Promise<string>{
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`

    const buffer = await file.arrayBuffer()
    const pdf = await pdfjs.getDocument(buffer).promise

    const pageList = await Promise.all(Array.from({ length: pdf.numPages }, (_, i) => pdf.getPage(i + 1)));
    const textList = await Promise.all(pageList.map((p) => p.getTextContent()));

    return textList
      .map(({ items }) => {
          return items
            .map((item) => (item as TextItem).str)
            .filter(str => str.trim() !== '')
            .join('\n')
      })
      .join('\n\n');
}

export async function extractTextFromFiles(files: File[]) {
    return Promise.all(files.map(extractTextFromFile))
}
