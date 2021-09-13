import { REG_EXP } from '@/common/constant'

export const siteRule = [
    {
        type: 'string',
        required: true,
        message: '货位不合法，例：A-01-01-01-01',
        validator: (rule: Record<string, unknown>, value = '') => {
            if (!REG_EXP.site.test(value)) {
                return Promise.reject(
                    new Error('货位不合法，例：A-01-01-01-01')
                )
            }
            return Promise.resolve()
        },
        trigger: 'change',
    },
]
