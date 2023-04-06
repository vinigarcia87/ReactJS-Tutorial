import React, {Component} from 'react';

import './styles.scss';

import {loadPost} from "../../utils/load-posts";
import {Posts} from "../../components/Posts";
import {AppButton} from "../../components/AppButton";

export class Home extends Component {
    state = {
        posts: [],
        allPosts: [],
        page: 0,
        postsPerPage: 4
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

    render() {
        const {page, postsPerPage, allPosts, posts} = this.state;
        const noMorePosts = page + postsPerPage >= allPosts.length;
        return (
            <section className="container">
                <Posts posts={posts} />
                <div className="button-container">
                    <AppButton
                        onClick={this.loadMorePosts}
                        disabled={noMorePosts}
                        text="Load More Posts"/>
                </div>
            </section>
        );
    }
}
