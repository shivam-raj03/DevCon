import React, { Fragment } from 'react';
import  Moment  from 'react-moment';

const ProfileExperience = ({experience: { company, from, to, title, description}}) => {
    //console.log(company);
    return (
         <Fragment>
        <h3 className='text-dark'>{company}</h3>
        <p>
            <Moment fromat='YYYY/MM/DD'>{from}</Moment> - {!to ? ' Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
        </p>
        <p>
            <strong>Position: </strong>{title}
        </p>
        <p>
            <strong>Description: </strong>{description}
        </p>   
    </Fragment>
  )
}

export default ProfileExperience;
