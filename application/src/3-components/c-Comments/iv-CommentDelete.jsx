/* -- Comment Delete React --*/
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import useAuth from '../../1-hooks/useAuth';


const CommentDelete = (props) => {
	const { auth } = useAuth();

	const handleDelete = async (e) => {
		e.preventDefault();
		let ask = confirm('Confirmer la suppresion ?');

		try{
			if (ask) {
				await axios({
					method: 'delete',
					url: `${process.env.REACT_APP_API}comment/delete/${props.postId}`,
					data : { 
						commentId : props.commentId,
						commenterId : auth.userId,
					},
					withCredentials : true,
				});
				alert('Suppresion confirmé');
				props.setChangePending(false);
				
			}

			else {
				alert('Suppresion annulé');
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


export default CommentDelete;

CommentDelete.propTypes = {
	setChangePending: PropTypes.bool.isRequired,
	postId: PropTypes.string.isRequired,
	commentId: PropTypes.string.isRequired,
};