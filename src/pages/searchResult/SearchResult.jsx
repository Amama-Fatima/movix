import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data.results) {
          setData({
            ...data,
            results: [...data.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data?.total_results > 1 ? "results" : "result"
                } of '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">Sorry, Results not found!</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;

// import { useParams } from "react-router-dom";
// import InfiniteScroll from "react-infinite-scroll-component";

// import "./style.scss";

// import { fetchDataFromApi } from "../../utils/api";
// import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
// import MovieCard from "../../components/movieCard/MovieCard";
// import Spinner from "../../components/spinner/Spinner";
// import noResults from "../../assets/no-results.png";
// import { useEffect, useState } from "react";

// const SearchResult = () => {

//   const [data, setData] = useState(null);
//     const [pageNum, setPageNum] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const { query } = useParams();

//     const fetchInitialData = ()=>{
//       setLoading(true);
//       fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res)=>{
//         setData(res);
//         setPageNum((prev)=>prev+1);
//         setLoading(false);

//       })
//     }

//     const nextPageData = ()=>{
//       setLoading(true);
//       fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res)=>{
//         if(data?.results){

//           setData({
//             ...data,
//             results: [...data?.results, ...res.results],
//         });

//           // setData({
//           //   ...data,
//           //   results: [...data?.results, ...res.results]
//           // })
//         }
//         else{
//           setData(res);
//         }

//         setPageNum((prev)=>prev+1);

//       }).finally(()=>setLoading(false))
//     }

//     useEffect(()=>{
//       setPageNum(1);
//       fetchInitialData();
//     }, [query])

//   return (
//     <div className="searchResultsPage">
//       {loading && <Spinner initial={true} className={`loaderClass ${pageNum > 1 ? 'bottom' : ''}`} />}
//       {!loading && (
//         <ContentWrapper>
//           {data?.results?.length > 0 ? (
//             <>
//               <div className="pageTitle">
//                 {`Search ${data?.total_results > 1 ? 'results' : 'result'} for "${query}"`}
//               </div>
//               <InfiniteScroll
//               className="content"
//               dataLength={data?.results?.length || []}
//               next={nextPageData}
//               hasMore={data?.total_pages >= pageNum}
//               loader = {<Spinner />}
//               >
//                 {data?.results?.map((item, index) =>{
//                   if(item.media_type === 'person'){
//                     return;
//                   }
//                   return (
//                     <MovieCard key={index} data={item} fromSearch={true} />
//                   )
//                 })}
//               </InfiniteScroll>
//             </>

//           ) : (
//             <span className='resultNotFound'>
//               Sorry, we couldn&apos;t find any results for "{query}"
//             </span>
//           )}
//         </ContentWrapper>
//       )}
//     </div>
//   )
// }

// export default SearchResult;
