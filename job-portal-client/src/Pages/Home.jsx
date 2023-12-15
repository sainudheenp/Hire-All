
import React, { useEffect, useState} from 'react'
import Banner from '../components/Banner'
import Card from '../components/Card';
import Jobs from './Jobs';
import Sidebar from '../sidebar/Sidebar';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  useEffect(() => {
    setIsLoading(true);
    fetch("jobs.json").then(res => res.json()).then(data => {
      // console.log(data);
      setJobs(data)
      setIsLoading(false);
    })
  },[])

  console.log(jobs);

  //handle input change
  const [query, setQuery] = useState("");
    const handleInputChange = (event) => {
        setQuery(event.target.value)
        console.log(query);
    }

    //filter jobs by title
    const filteredItems = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(query.toLocaleLowerCase()) !== -1);
    // console.log(filteredItems);

    //------radio filtering--------
      const handleChange = (event) => {
        setSelectedCategory(event.target.value)
      }

      //--------button based filtering------------
      const handleClick = (event) => {
        setSelectedCategory(event.target.value)
      }

      //---------main function----------
      // const filteredData = (jobs, selected, query) => {
      //   let filteredJobs = jobs;
      
      //   // filtering inputs
      //   if(query){
      //     filteredJobs = filteredItems;
      //   }

      //   // category filtering
      //   if(selected){
      //     filteredJobs = filteredJobs.filter(({jobLocation, maxPrice, experienceLevel, salaryType,
      //        employmentType, postingDate}) => {
      //         jobLocation.toLowerCase() === selected.toLowerCase() ||
      //         parseInt(maxPrice) <= parseInt(selected) ||
      //         salaryType.toLowerCase() === selected.toLowerCase() ||
      //         employmentType.toLowerCase() === selected.toLowerCase()
      //        });
      //        console.log(filteredJobs);
      //   }

      //   return filteredJobs.map((data, i) => <Card key={i} data={data}/>)
        
      // } 

      const filteredData = (jobs, selected, query) => {
        let filteredJobs = jobs;
     
        // Filtering inputs
        if (query) {
           filteredJobs = filteredJobs.filter(/* ... */); // Update this part as needed
        }
     
        // Category filtering
        if (selected) {
           filteredJobs = filteredJobs.filter(({ jobLocation, maxPrice, experienceLevel, salaryType, employmentType, postingDate }) => {
              return (
                 jobLocation.toLowerCase() === selected.toLowerCase() ||
                 parseInt(maxPrice) <= parseInt(selected) ||
                 salaryType.toLowerCase() === selected.toLowerCase() ||
                 employmentType.toLowerCase() === selected.toLowerCase()
              );
           });
           console.log(filteredJobs);
        }
     
        return filteredJobs.map((data, i) => <Card key={i} data={data} />);
     };
     

      const result = filteredData(jobs, selectedCategory, query);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange}/>
      <div className='bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12'>

        {/* left side */}
        <div className='bg-white p-4 rounded'>
          <Sidebar handleChange={handleChange} handleClick={handleClick}/>
        </div>

        {/* card details */}
        <div className='col-span-2 bg-white p-4 rounded-sm'>
          {
            isLoading ? (<p className='font-medium'>Loading...</p>): result.length > 0 ? (<Jobs result={result}/>) : <>
            <h3 className='text-lg font-bold mb-2'>{result.length} Jobs</h3>
            <p>No data found</p>
            </>
          }
          
          </div>

        {/* right side */}
        <div className='bg-white p-4 rounded'>Right</div>
      </div>

    </div>
  )
}

export default Home