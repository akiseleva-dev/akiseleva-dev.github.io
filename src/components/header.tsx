import React from 'react';
import {HomeData} from '../data/homeData';


export const Home = (data: HomeData) => {
    return (
        <header id='header'>
            <div className='intro'>
                <div className='overlay'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-9 intro-text'>
                                <h2>
                                    {data ? data.title : 'Loading'}
                                    <span/>
                                </h2>
                                <p dangerouslySetInnerHTML={{__html: data.paragraph}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
