export const loginSuccessful = () => ({
	type: 'LOGIN_SUCCESSFUL',
});

export const loginUnsuccessful = () => ({
	type: 'LOGIN_UNSUCCESSFUL',
});

export const logout = () => ({
	type: 'LOGOUT'
})

export const updatePostsArray = (posts) => ({
	type:'UPDATE_POSTS_ARRAY',
	posts
})

export const updateDeletedPostsArray = (post) => ({
	type: 'UPDATE_DELETED_POSTS_ARRAY',
	post
})