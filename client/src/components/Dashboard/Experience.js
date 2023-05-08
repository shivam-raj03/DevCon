import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profile';



const Experience = () => {
    const experience = useSelector(state => state.profile.profile.experience);
    const dispatch = useDispatch();

    const experiences = experience.map(exp => {
        return (<tr key={exp._id}>
            <td>{exp.company}</td>
            <td className='hide-sm'>{exp.title}</td>
            <td className='hide-sm'>{exp.location}</td>
            <td>
                <Moment format='YYYY/MM'>{exp.from}</Moment> - {
                    exp.to === null ? ('  Now'): 
                    (<Moment format='YYYY/MM'>{exp.to}</Moment>)
                }
            </td>
            <td>
                <button className='btn btn-danger' onClick={() => dispatch(deleteExperience(exp._id))} >Delete</button>
            </td>
        </tr>
        )
    });
    
    return (
    <Fragment>
        <h2 className='my-2'>Experience Credentials</h2>
        <table className='table'>
            <thead>
                <tr>
                    <th>Company</th>
                    <th className='hide-sm'>Title</th>
                    <th className='hide-sm'>Location</th>
                    <th className='hide-sm'>Years</th>
                    <th>Remove </th>
                </tr>
            </thead>
            <tbody>{ experiences }</tbody>
        </table>
      
    </Fragment>
    )
}

export default Experience;
