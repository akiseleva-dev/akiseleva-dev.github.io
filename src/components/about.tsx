import {AboutData} from "../data/data";

export const About = (data: AboutData) => {
    return (
        <div id="about">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        {" "}
                        <img src="img/about.jpg" className="img-responsive" alt=""/>{" "}
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <div className="about-text">
                            <div className="section-title">
                                <h1>About Me</h1>
                                <h3>{data ? data.paragraph : "loading..."}</h3>
                            </div>
                            <input id="skills" name="about" type="radio" className="about-radio"></input>
                            <input id="exp" name="about" type="radio" className="about-radio"></input>
                            <input id="education" name="about" type="radio" className="about-radio"></input>
                            <div className="about-switcher">
                                <label htmlFor="skills" className="about-tab">
                                    <h4>Main skills</h4>
                                </label>
                                <label htmlFor="exp" className="about-tab">
                                    <h4>Experience</h4>
                                </label>
                                <label htmlFor="education" className="about-tab">
                                    <h4>Education & Certification</h4>
                                </label>
                            </div>
                            <div className="about-details about-details-skills">
                                Skills
                            </div>
                            <div className="about-details about-details-exp">
                                Exp
                            </div>
                            <div className="about-details about-details-education">
                                Education
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
