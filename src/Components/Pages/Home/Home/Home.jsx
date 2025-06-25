import React from 'react';
import Banner from '../Banner/Banner';
import BrandName from '../BrandName/BrandName';
import WeddingStyleGuide from '../WeddingStyleGuide/WeddingStyleGuide';
import TrendingCategories from '../TrendingCategories/TrendingCategories';
import OfferBanner from '../OfferBanner/OfferBanner';
import ProductSlider from '../ProductSlider/ProductSlider';
import EidOfferProducts from '../EidOfferProducts/EidOfferProducts';
import CustomerReview from '../CustomerReview/CustomerReview';
import { Helmet } from 'react-helmet';
import EidShopBanner from './EidShopBanner/EidShopBanner';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Home Page</title>
            </Helmet>
            <div>
                <Banner></Banner>
                <div className='my-10'>
                    <BrandName></BrandName>
                </div>
                <div className="my-12">
                    <TrendingCategories></TrendingCategories>
                </div>
                <div className="my-12">
                    <OfferBanner></OfferBanner>
                </div>
                <div className="md:mt-28 mb-10">
                    <ProductSlider></ProductSlider>
                </div>
                <div className="md:mt-28 mb-10">
                    <EidShopBanner></EidShopBanner>
                </div>
                <div className="md:mt-28 mb-10">
                    <EidOfferProducts></EidOfferProducts>
                </div>
                <div className="md:mt-28 mb-10">
                    <CustomerReview></CustomerReview>
                </div>
            </div>
        </>
    );
};

export default Home;