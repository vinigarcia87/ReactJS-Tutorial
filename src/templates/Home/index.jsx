import React, {useState, useEffect, useCallback} from 'react';

import './styles.scss';

import {loadPost} from "../../utils/load-posts";
import {Posts} from "../../components/Posts";
import {AppButton} from "../../components/AppButton";
import {TextInput} from "../../components/TextInput";

export const Home = () => {
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [postsPerPage] = useState(4);
    const [searchValue, setSearchValue] = useState('');

    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = searchValue ?
        allPosts.filter(post => {
            return post.title.toLowerCase()
                    .includes(searchValue.toLowerCase())
        })
        : posts;

    const handleLoadPost = useCallback(async (page, postsPerPage) => {
        const postsAndPhotos = await loadPost();

        setPosts(postsAndPhotos.slice(page, postsPerPage));
        setAllPosts(postsAndPhotos);
    }, [])

    useEffect(() => {
        handleLoadPost(0, postsPerPage);
    }, [handleLoadPost, postsPerPage]);

    const loadMorePosts = () => {
        const nextPage = page + postsPerPage;
        const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
        posts.push(...nextPosts);

        setPosts(posts);
        setPage(nextPage);
    }

    const handleChange = (e) => {
        const {value} = e.target;

        setSearchValue(value);
    }

    return (
        <section className="container">
            <div className="search-container">
                {!!searchValue && (
                    <h1>Search value: {searchValue}</h1>
                )}
                <TextInput searchValue={searchValue} handleChange={handleChange}/>
            </div>

            {filteredPosts.length > 0 && (
                <Posts posts={filteredPosts} />
            )}
            {filteredPosts.length === 0 && (
                <p>Não existem posts!</p>
            )}
            <div className="button-container">
                {!searchValue && (
                    <AppButton
                        onClick={loadMorePosts}
                        disabled={noMorePosts}
                        text="Load More Posts"/>
                )}
            </div>
        </section>
    );
}