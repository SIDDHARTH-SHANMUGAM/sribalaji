// import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar';
import styled from 'styled-components';


function Home() {


  return (
    <DemoCont>
	<Navbar />
	  <Content>
	  </Content>
        
    </DemoCont>
  )
}
const DemoCont = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;


`;

const Content = styled.div`
`;
export default Home
