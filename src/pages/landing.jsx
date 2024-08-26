import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import React from 'react'
import { Link } from 'react-router-dom'
import companies from '../data/companies.json'
import faq from '../data/faq.json'
import Autoplay from "embla-carousel-autoplay"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'


export default function LandinPage() {
  return (
    <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>
      <section className='text-center'>
        <h1 className='flex flex-col items-center justify-center gradient-titel text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4'>Find Your Dream Job <span className='flex items-center gap-2 sm:-6'>and get <img src="/logo.png" alt="hirred" className='h-14 sm:h-24 lg:h-32' /></span></h1>
        <p className='text-gray-300 sm:mt-4 text-xs sm:text-xl '>Exlopre thousand of jobs listing or find the perfect candidate</p>
      </section>
      <div className='flex gap-5 items-center justify-center'>
        <Link to="/jobs">
          <Button variant="blue" size="xl">Find Jobs</Button>
        </Link>
        <Link to="/post-job">
          <Button variant="destructive" size="xl">Post Jobs</Button>
        </Link>
      </div>
      <Carousel plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
        className="w-full py-10"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => {
            return (
              <CarouselItem key={id} className="basis-1/6 lg:basis=1/8">
                <img src={path} alt={name}
                  className='h-9 sm:h-14 object-contain' />
              </CarouselItem>
            )

          })}
        </CarouselContent>

      </Carousel>
      <img src="/banner.jpeg" alt="banner" className='w-full ' />

      <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>For Job Seekers</CardTitle>
          </CardHeader>

          <CardContent>
            Search and apply for jobs, track application, and more.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
          </CardHeader>

          <CardContent>
            Post jobs, manage application, and find the best candidate.
          </CardContent>
        </Card>
      </section>
      <Accordion type="single" collapsible>
        {faq.map((item, index) => {
          return (
            <AccordionItem key={index} value={`item-${index++}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
               {item.answer}
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </main>
  )
}
