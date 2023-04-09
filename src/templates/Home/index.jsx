import React, {Component} from 'react';

import './styles.scss';

import {loadPost} from "../../utils/load-posts";
import {Posts} from "../../components/Posts";
import {AppButton} from "../../components/AppButton";
import {TextInput} from "../../components/TextInput";

export class Home extends Component {
    state = {
        posts: [],
        allPosts: [],
        page: 0,
        postsPerPage: 4,
        searchValue: ''
    };

    async componentDidMount() {
        await this.loadPosts();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    componentWillUnmount() {
    }

    loadPosts = async () => {
        const {page, postsPerPage} = this.state;

        const postsAndPhotos = await loadPost();
        this.setState({
            posts: postsAndPhotos.slice(page, postsPerPage),
            allPosts: postsAndPhotos
        });
    }

    loadMorePosts = () => {
        const {page, postsPerPage, allPosts, posts} = this.state;
        const nextPage = page + postsPerPage;
        const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
        posts.push(...nextPosts);

        this.setState({
            page: nextPage,
            posts
        });
    }

    handleChange = (e) => {
        const {value} = e.target;
        this.setState({searchValue: value});
    }

    render() {
        const {page, postsPerPage, allPosts, posts, searchValue} = this.state;
        const noMorePosts = page + postsPerPage >= allPosts.length;

        const filteredPosts = !!searchValue ?
                                allPosts.filter(post => {
                                    return post.title.toLowerCase().includes(searchValue.toLowerCase())
                                })
                                : posts;

        return (
            <section className="container">
                <div className="search-container">
                    {!!searchValue && (
                        <h1>Search value: {searchValue}</h1>
                    )}
                    <TextInput searchValue={searchValue} handleChange={this.handleChange}/>
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
                            onClick={this.loadMorePosts}
                            disabled={noMorePosts}
                            text="Load More Posts"/>
                    )}
                </div>
            </section>
        );
    }
}
