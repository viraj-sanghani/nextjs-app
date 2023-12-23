"use client";

import "@/styles/home.css";
import React, { Suspense, lazy } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Searchbar from "@/components/Searchbar";
import Loading from "@/components/Loading";
import { useGetHomePage } from "@/queryHooks/useHomePage";
import { setBotOpen } from "@/redux/reducers/botReducer";
import HomeBannerSwiper from "@/components/Swiper/HomeBannerSwiper";
import HomeAdsSwiper from "@/components/Swiper/HomeAdsSwiper";
const HowItWork = lazy(() => import("./HowItWork"));
const FeaturedTools = lazy(() => import("./FeaturedTools"));
const RentSaleProp = lazy(() => import("./RentSaleProp"));
const Recommendation = lazy(() => import("./Recommendation"));
const AdvertiseSwiper = lazy(() =>
  import("@/components/Swiper/AdvertiseSwiper")
);

const Home = ({ recentLaunch }) => {
  const dispatch = useDispatch();
  const { data, isLoading: loading, isFetching } = useGetHomePage();

  return (
    <div style={{ marginTop: -70 }}>
      <div className="home-banner">
        <div className="home-banner-wrap">
          <HomeBannerSwiper data={data?.homeBanners || []} />
        </div>
      </div>

      <div className="home-searchbar">
        <div className="searchbar-container">
          <div className="searchbar-wrap">
            <Searchbar isHome={true} />
          </div>
          <div className="popular-locality-wrap">
            <div className="pop-loc-title">Popular Localities</div>
            <Link href="/search/buy/residential/taloja-navi-mumbai?city=5&locality=910">
              <div className="pop-loc-item">Taloja</div>
            </Link>
            <Link href="/search/buy/residential/borivali-west-mumbai?city=1&locality=21">
              <div className="pop-loc-item">Borivali West</div>
            </Link>
            <Link href="/search/buy/residential/dombivli-thane?city=3&locality=795">
              <div className="pop-loc-item">Dombivli</div>
            </Link>
            <Link href="/search/buy/residential/vashi-navi-mumbai?city=5&locality=918">
              <div className="pop-loc-item">Vashi</div>
            </Link>
          </div>
        </div>
      </div>

      {recentLaunch.length > 0 ? (
        <>
          <div className="s-section-title max-width">
            <h3>Recent</h3>
            <h2>Launches</h2>
          </div>

          <HomeAdsSwiper data={recentLaunch} />
        </>
      ) : (
        <div className="data-loader">
          <Loading />
        </div>
      )}

      <Suspense fallback={null}>
        <RentSaleProp />

        <HowItWork />

        <Recommendation />

        <FeaturedTools />

        <AdvertiseSwiper title="Trending Projects" category={1} />

        <div className="home-section-pp max-width">
          <div
            href={{ pathname: "/post-property" }}
            className="inner-home-section"
          >
            <div className="pp-title">
              <div className="pp-title-1">
                Post your Property for <span className="dam">Free</span>
              </div>
              <div className="pp-title-2">
                List it on HousingMagic and get genuin leads.
              </div>
            </div>
            <Link href={{ pathname: "/post-property" }}>
              <div className="pp-btn">
                Post Property
                <span>Free</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="chatbot-section">
          <div className="chatbot-content max-width">
            <div className="chatbot-title">
              <span className="chatbot-label">Welcome to </span>
              <span className="chatbot-brand">HousingMagic's Assistance</span>
            </div>
            <div className="chatbot-description">
              Looking for a seamless and efficient way to find your dream
              property? Say hello to our cutting-edge Property Chatbot – your
              personal assistant in the world of real estate! Feel free to
              customize this description based on the specific features and
              capabilities of your property portal's chatbot.
            </div>
          </div>

          <div
            className="chatbot-btn"
            onClick={() => dispatch(setBotOpen(true))}
          >
            Chat with our Assistant
          </div>
        </div>

        <section className="featured-boxes-area bg-white-1">
          <div className="why-us">
            <h3>Why Choose Us</h3>
            <p>Buyer and Seller friendly direct platform</p>
          </div>
          <div className="featured-inner m-0">
            <div className="single-featured-box">
              <div className="icon color-fb7756">
                <Image
                  src="/img/icons/1.svg"
                  className="png"
                  width={100}
                  height={100}
                  alt="icon 1"
                />
              </div>
              <h3 className="mt-5">Find Your Home</h3>
            </div>
            <div className="single-featured-box">
              <div className="icon color-facd60">
                <Image
                  src="/img/icons/2.svg"
                  className="png"
                  width={100}
                  height={100}
                  alt="icon 2"
                />
              </div>
              <h3 className="mt-5">Trusted by thousands</h3>
            </div>
            <div className="single-featured-box">
              <div className="icon color-1ac0c6">
                <Image
                  src="/img/icons/3.svg"
                  className="png"
                  width={100}
                  height={100}
                  alt="icon 3"
                />
              </div>
              <h3 className="mt-5">Financing made easy</h3>
            </div>
            <div className="single-featured-box">
              <div className="icon">
                <Image
                  src="/img/icons/4.svg"
                  className="png"
                  width={100}
                  height={100}
                  alt="icon 4"
                />
              </div>
              <h3 className="mt-5">End to End Solutions</h3>
            </div>
          </div>
        </section>
      </Suspense>
    </div>
  );
};

export default Home;
