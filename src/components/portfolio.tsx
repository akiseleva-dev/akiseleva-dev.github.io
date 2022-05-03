import {ProjectCardData} from "../data/projectCardData";
import {ProjectCard} from "./projectCard";
import {FC} from "react";

interface Props {
    data: Array<ProjectCardData>;
}

export const Portfolio: FC<Props> = ({ data }) => {
    return (
        <div id='portfolio' className='text-center'>
            <div className='container'>
                <div className='section-title'>
                    <h1>My Latest Projects</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
                        dapibus leonec.
                    </p>
                </div>
                <div className='row'>
                    <div className='portfolio-items'>
                        {data
                            ? data.map((d, i) => (
                                <div key={`${d.title}-${i}`} className='col-sm-6 col-md-4 col-lg-4'>
                                    <ProjectCard {...d} />
                                </div>
                            ))
                            : 'Loading...'}
                    </div>
                </div>
            </div>
        </div>
    )
}
