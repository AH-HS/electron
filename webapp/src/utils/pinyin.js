import { match } from 'pinyin-pro'

const mockData = ['你好', '你好啊', '你好申旭旭', '你好申旭']

const target = 'nh'

export const getAns = (data, target) => {
    return data.filter((v) => match(v, target))
}

if (import.meta.vitest) {
    const { it, expect } = import.meta.vitest
    it('匹配数组中符合所写的元素', () => {
        expect(getAns(mockData, target)).toStrictEqual([
            '你好',
            '你好啊',
            '你好申旭旭',
            '你好申旭',
        ])
        expect(getAns(mockData, 'sxx')).toStrictEqual(['你好申旭旭'])
        expect(getAns(mockData, 'sx')).toStrictEqual(['你好申旭旭', '你好申旭'])
    })
}
