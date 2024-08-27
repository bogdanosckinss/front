import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    posts: [],
}

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
        },
        removeLike: (state, action) => {
            state.posts = state.posts.map(post => {
                if (post.id != action.payload.postId) {
                    return post
                }

                return {
                    ...post,
                    videoLikes: post?.videoLikes?.filter(video => video.user.id != action.payload.userId)
                }
            })
        },
        addLike: (state, action) => {
            state.posts = state.posts.map(post => {
                if (post.id != action.payload.postId) {
                    return post
                }

                return {
                    ...post,
                    videoLikes: [...post?.videoLikes, {user: {id: action.payload.userId}, video_id: post.id}]
                }
            })
        }
    },
})

export const { setPosts, removeLike, addLike } = postsSlice.actions
export default postsSlice.reducer
