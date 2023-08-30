import {useSelector} from 'react-redux'
import './style.scss'

const Genres = ({data}) => {
    const {genres} = useSelector((state) => state.home);

    

    return (
        <div className='genres'>
            {data?.map((g) => {
                if (!genres[g]) return null;  // Changed from 'return;' to 'return null;'
                return (
                    <div key={g} className="genre">
                        {genres[g]?.name}
                    </div>
                );
            })}
        </div>
    );
};

export default Genres;