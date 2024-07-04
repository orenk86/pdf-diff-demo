import * as diff from 'diff'
import { Change } from 'diff';

export async function generateDiff(str1: string, str2: string): Promise<Change[]> {
    return diff
      .diffSentences(str1, str2)
      .filter((change) => change.value.trim() !== '')
}
