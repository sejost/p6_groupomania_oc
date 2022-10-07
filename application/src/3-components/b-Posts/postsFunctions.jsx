export const findUser =  (array, myId, myUser) => {
	const findId = array.find((id) => id._id == myId);
	const result = (findId.usersLiked).includes(myUser);
	return result;
};


export const formatDate = (givenDate, format) => {
	const date = new Date(givenDate);
	const map = {
		mm: date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1,
		dd: date.getDate() <10 ? `0${date.getDate()}` : date.getDate(),
		yy: date.getFullYear().toString(),
		hh: date.getHours() <10 ? `0${date.getHours()}` : date.getHours(),
		mn: date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
	};
	return format.replace(/mm|dd|yy|hh|mn/gi, matched => map[matched]);
};
