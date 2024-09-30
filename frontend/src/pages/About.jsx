import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
              <p>Your Home, Nestled in Comfort At Shopnest, we're more than just an online store; we're your partner in creating a home that's as unique as you are. Our curated collection of kitchen essentials, furniture, home decor, and cookware is designed to elevate your living space, reflecting your personal style and taste..</p>
              <b className='text-gray-800' >Why Choose Shopnest ?</b>
                  <b className='text-underline-offset: 8px'>Quality Assurance: Every product we offer is carefully selected for its durability, functionality, and aesthetic appeal.</b>
                  <b>Diverse Range: From modern minimalist designs to classic traditional styles, we have something to suit every preference.</b>
                  <b>Convenience at Your Doorstep: Enjoy the ease of shopping from the comfort of your home and have your purchases delivered right to your doorstep.</b>
                  <b>Exceptional Customer Service: Our dedicated team is always ready to assist you with any questions or concerns..</b>

              <b className='text-gray-800'>Discover Your Home's Potential</b>
              <p>Whether you're looking to revamp your kitchen, create a cozy living room, or add a touch of elegance to your bedroom, Shopnest has everything you need. Explore our collection and let us help you transform your space into a haven of comfort and style.</p>

                <b>Shopnest. Your Home, Nestled in Comfort.</b>
          </div>
      </div>

              <div className=' text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p className=' text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience:</b>
            <p className=' text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
            <p className=' text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
          </div>
      </div>

      <NewsletterBox/>
      
    </div>
  )
}

export default About
