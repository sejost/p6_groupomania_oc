import React from 'react';

const ModifyPost = () => {
	return (
		<div className='post__wrapper' key={`${post.id}-${index}`}>
			<form onSubmit={handleSubmit}>
				<div className='post__headPart'>
					<input className='input--title post__title'
						placeholder={post.postTitle}
						type="text"
						id="titleContent"
						autoComplete="off"
						onChange={(e) => setPostContent({...postContent, title: e.target.value})}
						required
						aria-describedby="titre à remplir"
					/>
				</div>
				<div className='post__mainPart'>
					<input className='input--message'
						placeholder={post.postText}
						type="text"
						id="messageContent"
						autoComplete="off"
						onChange={(e) => setPostContent({...postContent, message: e.target.value})}
						aria-describedby="titre à remplir"
					/>
					<div className='post__postImage__container'>
						<img className='post__postImage__content' id={`${post._id}_postImage`}src={post.postImage} />
						<input
							type="file"
							id="file-upload"
							name="file"
							accept=".jpg, .jpeg, .png"
							onChange={(e) => setUpPicture(e.target.files[0])}
						/>
					</div>
				</div>
				<button type='submit'>Envoyer</button> 
			</form>
		</div>
	);
};

export default ModifyPost;