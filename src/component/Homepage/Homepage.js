import videohomepage from '../../assets/video-homepage.mp4';
import '../Homepage/Homepage.scss'

const Homepage = () => {
    
    return (
        <div className='homepage-container'>
            <video autoPlay loop muted >
                <source src={videohomepage} type="video/mp4" />
            </video>
            <div className='homepage-contain'>
                <div className='title-1'>
                    Looks striking. Feels effortless.
                </div>
                <div className='title-2'>
                    Impress your form takers. Catch their eye with striking visuals,
                    and make form-filling feel effortless by replacing walls of questions
                    with just one at a time.
                </div>
                <div className='title-3'>
                    <button className='btn-start'>
                        Get's start. It's free
                    </button>
                </div>
                
            </div>
        </div>
    )
}
export default Homepage;