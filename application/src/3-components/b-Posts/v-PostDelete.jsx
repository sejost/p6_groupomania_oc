/* -- Posts Delete React --*/
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import useAuth from '../../1-hooks/useAuth';
import { MdDeleteForever } from 'react-icons/md';

/* -- Posts Delete Main Function  --*/
const PostDelete = (props) => {
	const { auth } = useAuth();

	/* -- We first ask if the user is safe to delete, then the process continues --*/
	const handleDelete = async (e) => {
		e.preventDefault();
		let ask = confirm('Confirmer la suppresion ?');
		try{
			if (ask) {
				alert('Suppresion confirmé');
				await axios({
					method: 'delete',
					url: `${process.env.REACT_APP_API}post/delete/${props.postId}`,
					data : { userId : auth.userId},
					withCredentials : true,
				});
				props.setChangePending(false);
			}
			else {
				alert('Suppression annulé');
				props.setChangePending(false);
			}

		}
		catch(error){
			alert(error);
		}
	};

	return(
		<MdDeleteForever onClick={handleDelete} className='icon icon__tools icon__delete'/>
	);

};

export default PostDelete;

PostDelete.propTypes = {
	postId: PropTypes.string,
	setChangePending: PropTypes.func,
};