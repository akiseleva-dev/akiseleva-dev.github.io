import {ProjectCardData} from "../data/projectCardData";

export const ProjectCard = (data: ProjectCardData) => {
    return (
        <div className='portfolio-item'>
            <div className='hover-bg'>
                {' '}
                <a
                    href={data.largeImage}
                    title={data.title}
                    data-lightbox-gallery='gallery1'
                    className="portfolio-item-link"
                >
                    <div className='hover-text'>
                        <h3>Development</h3>
                        <h4>{data.title}</h4>
                        <button type='button' className='btn btn-custom btn-lg'>
                            View details
                        </button>
                    </div>
                    <img
                        src={data.smallImage}
                        className='img-responsive'
                        alt={data.title}
                    />{' '}
                </a>{' '}
            </div>
        </div>
    )
}
