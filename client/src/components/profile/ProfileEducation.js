import React, { Fragment } from 'react';
import  Moment  from 'react-moment';

const ProfileEducation = ({education : {school, degree, fieldofstudy, from, to, description}}) => {
    //console.log(school);
    return (
    <Fragment>
        <h3 className='text-dark'>{school}</h3>
        <p>
            <Moment fromat='YYYY/MM/DD'>{from}</Moment> - {!to ? ' Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
        </p>
        <p>
            <strong>Degree: </strong>{degree}
        </p>
        <p>
            <strong>Field of study: </strong>{fieldofstudy}
        </p>
        <p>
            <strong>Description: </strong>{description}
        </p>   
    </Fragment>
  )
}

export default ProfileEducation;