import React from 'react';
import Banner from '../Banner/Banner';
import LuxuryRestaurant from '../LuxuryRestaurant/LuxuryRestaurant';
import FoodMenu from '../FoodMenu/FoodMenu';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';
import ChefSelection from '../ChefSelection/ChefSelection';
import ExpertChefs from '../ExpertChefs/ExpertChefs';
import GallerySlider from '../GallerySlider/GallerySlider';
import Testimonials from '../Testimonials/Testimonials';
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';


const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <LuxuryRestaurant></LuxuryRestaurant>
            <FoodMenu></FoodMenu>
              <GallerySlider></GallerySlider>
            <WhyChooseUs></WhyChooseUs>
            <ChefSelection></ChefSelection>
            <ExpertChefs></ExpertChefs>
          <Testimonials></Testimonials>
          <ScrollToTopButton></ScrollToTopButton>
        </div>
    );
};

export default Home;