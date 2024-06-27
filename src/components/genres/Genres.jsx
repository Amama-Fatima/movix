import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import "./style.scss";

const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);

  return (
    <div className="genres">
      {data?.map((g) => {
        if (!genres[g]) return null; // Changed from 'return;' to 'return null;'
        return (
          <div key={g} className="genre">
            {genres[g]?.name}
          </div>
        );
      })}
    </div>
  );
};

Genres.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Genres;
