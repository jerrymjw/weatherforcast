import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Temprature from '../../components/Temperature';
import background from './assests/background.jpeg';
import Metas from './components/Metas';
import Subtext from './components/SubText';
import getWeather from '../../apis/getWeather';

const Container = styled.div`

    padding: 60px 80px;
    background-image: url(${background});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    color: white;
    display: flex;
    position: relative;
`;

const CurrentTemperature = styled.div`
    font-size: 5rem;
`;

const Weather = styled.div`
    font-size: 1.5rem;
    text-align: center;
`;

const CityName = styled.div`
    flex: 1;
    font-size: 2rem;
    text-align: right;
    margin-top: 16px;
`;

const Strip = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: black;
    opacity: 0.3;
    height: 24px;
`;

const Current = ({
    cityId,
}) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getWeather(cityId).then((response) => setData({
            cityName: response.data.name,
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            weather: response.data.weather[0].main,
            wind: response.data.wind.speed,
        }));
    }, [cityId]);

    useEffect(() => {
        if (!data) {
            return;
        }

        setLoading(false);
    }, [data]);

    return (
        <Container>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <React.Fragment>
                    <div>
                        <CurrentTemperature>
                            <Temprature>{data.temperature}</Temprature>
                        </CurrentTemperature>
                        <Weather>
                            <Subtext>{data.weather}</Subtext>
                        </Weather>
                        <Metas humidity={data.humidity} wind={data.wind} />
                    </div>
                    <CityName>
                        {data.cityName}
                    </CityName>
                </React.Fragment>
            )}
            <Strip />
        </Container>
    );
};

export default Current;
