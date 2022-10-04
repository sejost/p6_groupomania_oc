import React, { useState } from 'react';

const UploadFiles = () => {
	const [picture, setPicture] = useState(null);

	const handlePicture = (e) => {
		setPicture(e.target.file);
	  }; 

	return (
		<div className="upload__files">
			<input
				type="file"
				id="file-upload"
				name="file"
				accept=".jpg, .jpeg, .png"
				onChange={(e) => handlePicture(e)}
			/>
		</div>
	);
};

export default UploadFiles;










    


