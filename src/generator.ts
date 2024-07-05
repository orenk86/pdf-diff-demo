import * as diff from 'diff'
import { Change } from 'diff';
import { stringSimilarity } from 'string-similarity-js'

export enum DiffReportType {
    ByWord,
    BySentence,
}

export async function generateDiff(str1: string, str2: string, type: DiffReportType): Promise<Change[]> {
    let diffResult: Change[] = [];
    switch (type) {
        case DiffReportType.ByWord:
            diffResult = await generateDiffByWord(str1, str2);
            break;
        case DiffReportType.BySentence:
            diffResult = await generateDiffBySentence(str1, str2);
            break;
        default:
            break;
    }
    return diffResult
      .filter((change) => change.value.trim() !== '')
}

async function generateDiffByWord(str1: string, str2: string): Promise<Change[]> {
    return diff.diffWords(str1, str2)
}

async function generateDiffBySentence(str1: string, str2: string): Promise<Change[]> {
    return diff.diffSentences(str1, str2)
}

export async function calculateSimilarity(str1: string, str2: string): Promise<number> {
    return stringSimilarity(str1, str2)
}
