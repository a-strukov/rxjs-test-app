import React from 'react';
import styled from 'styled-components';

import useData from './hooks/useData';
import { NOT_AVAILABLE } from './constants';

const Background = styled.div`
  background-color: #5c3984;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(8px + 1vmin);
  color: white;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 700px;
`;

const Value = styled.span`
  font-size: 40px;
  font-weight: bold;
  margin-right: .5rem;
  margin-bottom: .5rem;
`;

const Card = styled(({ title, value, measure, ...restProps }) => (
  <div {...restProps}>
    {title}
    <div>
      <Value data-testid="value">{value || NOT_AVAILABLE}</Value>
      {measure}
    </div>
  </div>
))`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, .1);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, .2) 0 5px 5px -3px, rgba(0, 0, 0, .14) 0 8px 10px 1px, rgba(0, 0, 0, .12) 0 3px 14px 2px;
`;

function App() {
  const [{ temperature, airPressure, humidity }] = useData({});

  return (
    <Background>
      <Container>
        {!temperature && !airPressure && !humidity && <div>Loading...</div>}
        {temperature && airPressure && humidity && (
          <>
            <Card title="Temperature" value={temperature} measure="°C" />
            <Card title="Air pressure" value={airPressure} measure="mm Hg" />
            <Card title="Humidity" value={humidity} measure="%" />
          </>
        )}
      </Container>
    </Background>
  );
}

export default App;
