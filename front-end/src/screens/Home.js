// import React, { useEffect } from 'react'
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import MDProfile from '../components/MDProfile';


function Home() {


  return (
    <DemoCont>
      <Navbar />
	  <Content>
		<MDProfile />
	  </Content>
        
    </DemoCont>
  )
}
const DemoCont = styled.div`
	background-color: #53e3a752;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;


`;

const Content = styled.div`
`;
export default Home
