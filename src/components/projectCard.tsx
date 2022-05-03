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
                >
                    <div className='hover-text'>
                        <h4>{data.title}</h4>
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
