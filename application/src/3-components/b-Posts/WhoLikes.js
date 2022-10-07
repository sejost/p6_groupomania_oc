export const findUser =  (array, myId, myUser) => {
	const findId = array.find((id) => id._id == myId);
	const result = (findId.usersLiked).includes(myUser);
	return result;
};



