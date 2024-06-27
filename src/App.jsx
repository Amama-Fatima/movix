import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useDispatch } from "react-redux";
import { getApiConfigurations, getGenres } from "./store/homeSlice";
import Home from "./pages/home/Home";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import PageNotFound from "./pages/404/PageNotFound";
import Details from "./pages/details/Details";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchApiConfig();
    console.log("Now fetching genres");
    genresCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfigurations(url)); // get apiconfig is an action creator n dispatching it sends it to the reducer
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];

    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`genre/${url}/list`));
    });
    const data = await Promise.all(promises);

    data.map(({ genres }) => {
      return genres.map((item) => {
        allGenres[item.id] = item;
      });
    });
    dispatch(getGenres(allGenres));
  };

  return (
    <>
      <Router basename="/movix">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
