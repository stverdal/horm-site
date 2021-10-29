import * as React from "react"
import ReactDOM from "react-dom"
import { Layout, Menu } from "antd"

const PageLayout = ({ children }) => {

    const { Header, Content, Footer } = Layout;
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    {new Array(15).fill(null).map((_, index) => {
                        const key = index + 1;
                        return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
                    })}
                </Menu>
            </Header>
            <Content>
                {children}
            </Content>
            <Footer>
                <p>Horm website V0.0.1</p>
            </Footer>
        </Layout>
    )
}

export default PageLayout