import axios from 'axios';
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';

export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';

export const REQUESTS_POSTS = 'REQUESTS_POSTS';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export function selectSubreddit(subreddit){
    return {
        type:SELECT_SUBREDDIT,
        subreddit
    };
}

export function invalidateSubreddit(subreddit){
    return {
        type:INVALIDATE_SUBREDDIT,
        subreddit
    };
}

export function requestPosts(subreddit){
    return {
        type:REQUESTS_POSTS,
        subreddit
    };
}

export function receivePosts(subreddit,json){
    return {
        type:RECEIVE_POSTS,
        subreddit,
        posts:json.data.children.map(child => child.data),
        receiveAt:Date.now()
    };
}


function fetchPosts(subreddit){
    return function(dispatch){
        dispatch(requestPosts(subreddit));
        return axios.get(`https://www.reddit.com/r/${subreddit}.json`)
            .then(response => response.data,error => {
                console.log('An error occurred.',error);
            })
            .then(json => {
                dispatch(receivePosts(subreddit,json));
            });
    };
}

function shouldFetchPosts(state,subreddit){
    const posts = state.postsBySubreddit[subreddit];
    if(!posts){
        return true;
    }else if(posts.isFetching){
        return false;
    }else {
        return posts.didInvalidate;
    }
}

export function fetchPostsIfNeeded(subreddit){
    return (dispatch,getState) => {
        if(shouldFetchPosts(getState(),subreddit)){
            return dispatch(fetchPosts(subreddit));
        }else{
            return Promise.resolve();
        }
    };
}