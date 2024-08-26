import { getJobs } from '@/api/apiJobs'
import React, { useEffect, useState } from 'react'
import useFetch from '@/hooks/use-fetch'
import { BarLoader } from 'react-spinners'
import { useUser } from '@clerk/clerk-react'
import JobCard from '@/components/job-card'
import { getCompanies } from '@/api/apiCompanies'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { State } from 'country-state-city'


export default function JobListing() {

  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [company_id, setCompany_id] = useState("")
  const { isLoaded } = useUser()


  const { fn: fnJobs, data: jobs, loading: loadingJobs } = useFetch(getJobs, { searchQuery, location, company_id })


  const {
    // loading: loadingCompanies,
    data: companies = [],
    fn: fnCompanies,
  } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }

  });

  // console.log(jobs) // this Jobs are comming from supabase database
  // -----------------------------------------------------------
  const hnadleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const query = formData.get("search-query");
    if (query) {
      setSearchQuery(query);
    }
  }

  const clearFilters = (e) => {
    e.preventDefault();
    setSearchQuery("");
    setLocation("");
    setCompany_id("");
  }

  // -------------------------------------------
  useEffect(() => {
    fnJobs();
  }, [isLoaded, searchQuery, location, company_id,]);

  if (!isLoaded) {
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
  }

  return (
    <div>
      <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8' >Latest Jobs</h1>

      {/* {filters} */}
      <form action="" onSubmit={hnadleSearch} className='h-14 flex w-full gap-2
       items-cente mb-3'>
        <Input
          type="text"
          placeholder="Search jobs by Title..."
          name="search-query"
          className="h-full flex-1 px-4 text-md mb-3"

        />
        <Button variant="blue"
          type="submit"
          className="h-full sm:w-28 font-bold"
        >Serch Job</Button>
      </form>

      <div className='flex flex-col sm:flex-row gap-2'>
        <Select value={location} onValueChange={(value) => { setLocation(value) }}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return <SelectItem key={name} value={name}>{name}</SelectItem>
              })}

            </SelectGroup>
          </SelectContent>
        </Select>
        {/* -------------------------------compannies name filter-------------------- */}

        <Select value={company_id} onValueChange={(value) => { setCompany_id(value) }}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies.map(({ name, id }) => {
                return <SelectItem key={name} value={id}>{name}</SelectItem>
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button variant="destructive" className="sm:w-1/2" onClick={clearFilters} >Clear</Button>

      </div>




      {loadingJobs && (
        <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
      )}


      {loadingJobs === false && (
        <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {jobs?.length ? (
            jobs.map((job) => {
              return <JobCard key={job.id} job={job} savedInit={job?.saved?.length > 0} />;
            })
          ) : (
            <p className='text-center text-xl sm:text-2xl'>No Jobs Found 🥲</p>
          )}
        </div>
      )}
    </div>
  )
}
