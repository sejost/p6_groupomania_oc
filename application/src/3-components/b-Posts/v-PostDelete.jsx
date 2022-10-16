import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import useAuth from '../../1-hooks/useAuth';


const PostDelete = (props) => {
	const { auth } = useAuth();

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
		<button onClick={handleDelete}>Supprimer</button>
	);

};

export default PostDelete;

PostDelete.propTypes = {
	postId: PropTypes.string,
	setChangePending: PropTypes.bool,
};