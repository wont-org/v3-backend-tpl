import { VNode } from 'vue'
import {
    Menu,
    // Row,
    // Col,
} from 'ant-design-vue'
import {
    RouteRecordRaw, RouteMeta 
} from 'vue-router'

const { SubMenu, Item } = Menu

interface SubSiderMenuProps {
    routeRaw: RouteRecordRaw
    path: string
    collapsed?: boolean
}
const SubSiderMenu = (props: SubSiderMenuProps): VNode => {
    const { meta = {} as RouteMeta, children } = props.routeRaw
    const {
        title,
        // isHidden,
        hideSubRoute,
        Icon,
    } = meta

    return (
        <section>
            {Array.isArray(children) && children.length > 0 && (
                <>
                    {!hideSubRoute ? (
                        <SubMenu
                            key={props.routeRaw.path}
                            v-slots={{
                                title: () => !props.collapsed && title,
                                icon: () =>
                                    typeof Icon === 'function' && <Icon />,
                            }}
                        >
                            {children.map((routeRaw: RouteRecordRaw) => {
                                return (
                                    <SubSiderMenu
                                        routeRaw={routeRaw}
                                        key={routeRaw.path}
                                        path={routeRaw.path}
                                    />
                                )
                            })}
                        </SubMenu>
                    ) : (
                        <Item key={props.routeRaw.path}>
                            <span>{title}</span>
                        </Item>
                    )}
                </>
            )}
            {!children && (
                <Item key={props.routeRaw.path}>
                    <span>{title}</span>
                </Item>
            )}
        </section>
    )
}

export default SubSiderMenu
