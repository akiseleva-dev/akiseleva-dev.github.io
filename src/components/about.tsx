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
                            <input id="skills" name="about" type="radio" className="about-radio" defaultChecked></input>
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
                                <ul>
                                    <li>Java Development</li>
                                    <li>Scala Development</li>
                                    <li>Spring Experience (Spring Boot, Spring Security, Spring JPA)</li>
                                    <li>ORM Database (MySQL, Postgres, Oracle)</li>
                                    <li>CI/CD (Jenkins, Docker, AWS)</li>
                                    <li>English - Low Intermediate</li>
                                </ul>
                            </div>
                            <div className="about-details about-details-exp">
                                <ul>
                                    <li>Middle Software Engineer - Lineate
                                        <h5>May 2021 - nowadays</h5>
                                    </li>
                                    <li>Junior Software Engineer - Lineate
                                        <h5>Aug 2020 - Apr 2021</h5>
                                    </li>
                                    <li>Trainee - Lineate
                                        <h5>Feb 2020 - Jul 2020</h5>
                                    </li>
                                </ul>
                            </div>
                            <div className="about-details about-details-education">
                                <ul>
                                    <li>Master's degree, Applied Mathematics
                                        <h5>Omsk State University</h5>
                                        <h6>2021 - nowadays</h6>
                                    </li>
                                    <li>Bachelor's degree, Applied Mathematics and Computer Science
                                        <h5>Omsk State University</h5>
                                        <h6>2017 - 2021</h6>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
