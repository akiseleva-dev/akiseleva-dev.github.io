import {AboutData} from "../data/data";

export const About = (data: AboutData) => {
    return (
        <div id="about">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        {" "}
                        <img src="img/about.jpg" className="img-responsive" alt="" />{" "}
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <div className="about-text">
                            <div className="section-title">
                                <h1>About Me</h1>
                                <h3>{data ? data.paragraph : "loading..."}</h3>
                            </div>
                            <ul className="about-switcher">
                                <a><h4>Main skills</h4></a>
                                <a><h4>Experience</h4></a>
                                <a><h4>Education & Certification</h4></a>
                            </ul>
                            <div className="list-style">
                                <div className="col-lg-6 col-sm-6 col-xs-12">
                                    <ul>
                                        {"loading"}
                                    </ul>
                                </div>
                                <div className="col-lg-6 col-sm-6 col-xs-12">
                                    <ul>
                                        {"loading"}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
