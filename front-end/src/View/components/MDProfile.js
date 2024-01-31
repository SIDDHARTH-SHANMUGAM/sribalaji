import React from 'react'
import styled from 'styled-components'

function MDProfile() {
  return (
    <Container>
        <Segment1>
            <div className='content'>
              <h3>Manager Director</h3>
              <h1>Shanmugam Krishnan</h1>
            </div>
            <div className='image'>
              <img src='/asserts/appa.jpg' alt=''/>
            </div>
        </Segment1>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 400px;
  background-color: green;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const Segment1 = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 10%;
  .content{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .image{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img{
      width: 50%;
    }
  }
`;

export default MDProfile
