import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    posts: [],
    selectedVideoIndex: 0,
    query: '',
    searchOptions: [],
    loading: false,
    hideNotFoundNote: false
}

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.selectedVideoIndex = 0
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
        },
        setSelectedVideoIndex: (state, action) => {
            state.selectedVideoIndex = action.payload
        },
        setQuery: (state, action) => {
            state.query = action.payload
        },
        setSearchOptions: (state, action) => {
            state.hideNotFoundNote = false
            state.searchOptions = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setHideNotFoundNote: (state, action) => {
            state.hideNotFoundNote = action.payload
        }
    },
})

export const {setHideNotFoundNote, setLoading, setSearchOptions, setQuery, setPosts, removeLike, addLike, setSelectedVideoIndex } = postsSlice.actions
export default postsSlice.reducer
