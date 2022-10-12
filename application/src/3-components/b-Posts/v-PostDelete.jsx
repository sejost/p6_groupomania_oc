import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

import useAuth from '../../1-hooks/useAuth';


const PostDelete = (props) => {
	const { auth } = useAuth();



	const handleDelete = async (e) => {
		e.preventDefault();
		let ask = confirm('Confirmer la suppresion ?');
		try{
			if (ask) {
				console.log('Suppression confirmé');
				let response = await axios({
					method: 'delete',
					url: `${process.env.REACT_APP_API}post/delete/${props.postId}`,
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

export default PostDelete;