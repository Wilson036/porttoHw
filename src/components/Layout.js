import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const { Header, Content, Footer } = Layout;

const StyledHeader = styled(Header)`
  display: flex;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  h1 {
    color: white;
    font-size: 2rem;
    font-stretch: normal;
    font-weight: 500;
    line-height: 1.5;
    margin: 0 10px;
  }
`;

const StyledContent = styled(Content)`
  padding: 0 50px;
  margin-top: 64px;
  div {
    min-height: 280px;
    background-color: #fff;
  }
`;

const StyledFooter = styled(Footer)`
  text-align: center;
`;

export default function LayoutComponent({ children }) {
  return (
    <Layout className="layout">
      <StyledHeader>
        <Logo>
          <img
            alt="portto logo"
            src="https://s3cdn.yourator.co/companies/logos/000/001/082/thumb/b8b65d3cd5f4965d558d4542af25b97e9d3d1db6.png"
            width="61"
            height="61"
          />
          <h1>
            <span>portto</span>
          </h1>
        </Logo>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/page1">page 1</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/page2">page 2</Link>
          </Menu.Item>
        </Menu>
      </StyledHeader>
      <StyledContent>
        <div>{children}</div>
      </StyledContent>
      <StyledFooter>Ant Design ©2018 Created by Ant UED</StyledFooter>
    </Layout>
  );
}
