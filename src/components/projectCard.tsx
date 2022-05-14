import {ProjectCardData} from "../data/projectCardData";
import {FC, HTMLAttributes} from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
    data: ProjectCardData;
    onClick: () => void;
}

export const ProjectCard: FC<Props> = ({ data, className, onClick, ...rest }) => {
    const classes = `portfolio-item ${className}`;

    return (
        <div {...rest} className={classes}>
            <div className='hover-bg'>
                {' '}
                <div className="portfolio-item-link">
                    <div className='hover-text'>
                        <h3>Development</h3>
                        <h4>{data.shortTitle}</h4>
                        <button onClick={onClick} type='button' className='btn btn-custom btn-lg'>
                            View details
                        </button>
                    </div>
                    <img
                        src={data.smallImage}
                        className='img-responsive'
                        alt={data.title}
                    />{' '}
                </div>{' '}
            </div>
        </div>
    )
}
