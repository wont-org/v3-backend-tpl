import {
    Dropdown, Menu, Button 
} from 'ant-design-vue'
import { useRoute } from 'vue-router'
import { get } from 'lodash'
import {
    site, SiteItem 
} from '@/common/env'

export const EnvMenu = (
    <Menu>
        {site.map((item: SiteItem) => {
            return (
                <Menu.Item key={item.path}>
                    <a
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                    >
                        {item.label}
                    </a>
                </Menu.Item>
            )
        })}
    </Menu>
)

const SwitchEnv = () => {
    const route = useRoute()
    const port = get(window, 'location.port')
    const { __env: env } = route.query
    const envItem: Partial<SiteItem> =
        site.find((item) => item.env === env) || {}
    const { label } = envItem
    return env !== 'prod' ? (
        <Dropdown overlay={EnvMenu} trigger={['click']}>
            {label && <Button type="link">{port ? '本地环境' : label}</Button>}
        </Dropdown>
    ) : null
}

export default SwitchEnv
