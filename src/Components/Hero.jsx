import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router';

const Hero = () => {
    return (
        <section className="relative">
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={50}
                slidesPerView={1}
                autoplay={{ delay: 5000 }}
                pagination={{ clickable: true }}
                loop={true}
            >
                {/* Slide 1 */}
                <SwiperSlide>
                    <section className="bg-gradient-to-r from-indigo-50 to-white py-16">
                        <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-10">
                            <Fade direction="left" triggerOnce>
                                <div className="flex-1">
                                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                                        Discover Your Next <span className="text-indigo-600">Favorite Book</span>
                                    </h1>
                                    <p className="text-gray-600 mt-4 text-lg">
                                        Build your own bookshelf, track your reading journey, and share your reviews with the world.
                                    </p>
                                    <div className="mt-6 flex gap-4">
                                        <Link to="/bookshelf" className="btn btn-primary">Explore Books</Link>
                                        <Link to="/add-book" className="btn btn-outline btn-secondary">Add a Book</Link>
                                    </div>
                                </div>
                            </Fade>
                            <Fade direction="right" triggerOnce>
                                <div className="flex-1">
                                    <img src="/book1.png" alt="Bookshelf" className="w-full max-w-md mx-auto" />
                                </div>
                            </Fade>
                        </div>
                    </section>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <section className="bg-gradient-to-r from-yellow-50 to-white py-16">
                        <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-10">
                            <Fade direction="left" triggerOnce>
                                <div className="flex-1">
                                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                                        Your Personal <span className="text-yellow-600">Library, Reinvented</span>
                                    </h1>
                                    <p className="text-gray-600 mt-4 text-lg">
                                        Create custom shelves, track reading progress, and never lose sight of your literary goals.
                                    </p>
                                    <div className="mt-6 flex gap-4">
                                        <Link to="/my-shelf" className="btn btn-primary">Go to My Shelf</Link>
                                        <Link to="/add-book" className="btn btn-outline btn-secondary">Add New Read</Link>
                                    </div>
                                </div>
                            </Fade>
                            <Fade direction="right" triggerOnce>
                                <div className="flex-1">
                                    <img src="/book3.png" alt="Custom Library" className="w-full max-w-md mx-auto" />
                                </div>
                            </Fade>
                        </div>
                    </section>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide>
                    <section className="bg-gradient-to-r from-pink-50 to-white py-16">
                        <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-10">
                            <Fade direction="left" triggerOnce>
                                <div className="flex-1">
                                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                                        Share Your Thoughts, <span className="text-pink-600">Inspire Others</span>
                                    </h1>
                                    <p className="text-gray-600 mt-4 text-lg">
                                        Rate books, write reviews, and connect with fellow readers who share your taste.
                                    </p>
                                    <div className="mt-6 flex gap-4">
                                        <Link to="/reviews" className="btn btn-primary">Browse Reviews</Link>
                                        <Link to="/add-review" className="btn btn-outline btn-secondary">Write a Review</Link>
                                    </div>
                                </div>
                            </Fade>
                            <Fade direction="right" triggerOnce>
                                <div className="flex-1">
                                    <img src="/book2.png" alt="Book Reviews" className="w-full max-w-md mx-auto" />
                                </div>
                            </Fade>
                        </div>
                    </section>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Hero;
