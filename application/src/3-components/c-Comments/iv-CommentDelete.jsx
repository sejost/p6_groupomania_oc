import React from 'react';
import axios from 'axios';

import useAuth from '../../1-hooks/useAuth';


const CommentDelete = (props) => {
	const { auth } = useAuth();

	const handleDelete = async (e) => {
		e.preventDefault();
		let ask = confirm('Confirmer la suppresion ?');
		try{
			if (ask) {
				console.log('Suppression confirmé');
				let response = await axios({
					method: 'delete',
					url: `${process.env.REACT_APP_API}comment/delete/${props.postId}`,
					data : { userId : auth.userId},
					withCredentials : true,
				});
				props.setChangePending(false);
			}
			else {
				console.log('Suppression annulé');
				props.setChangePending(false);
			}

		}
		catch(error){
			console.log(error);
		}
	};

	return(
		<button onClick={handleDelete}>Supprimer</button>
	);

};

export default CommentDelete;