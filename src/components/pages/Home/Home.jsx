import React from 'react';
import Banner from './Banner';
import HowItWork from './HowItWork';
import Featured from './Featured';
import WhyItMatters from './WhyItMatters';
import SuccessStory from './SuccessStory';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWork></HowItWork>
            <Featured></Featured>
            <WhyItMatters></WhyItMatters>
            <SuccessStory></SuccessStory>
        </div>
    );
};

export default Home;