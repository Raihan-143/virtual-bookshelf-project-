import React from 'react';
import Hero from '../Components/Hero';
import PopularBooks from '../Components/PopularBooks';
import FeaturedCategories from '../Components/FeaturedCategories';
import Testimonials from '../Components/Testimonials';
import TopAuthors from '../Components/TopAuthors';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <PopularBooks></PopularBooks>
            <FeaturedCategories></FeaturedCategories>
            <Testimonials></Testimonials>
            <TopAuthors></TopAuthors>
        </div>
    );
};

export default Home;