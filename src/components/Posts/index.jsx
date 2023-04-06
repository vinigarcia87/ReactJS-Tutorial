import {PostCard} from "../PostCard";
import React from "react";

import './styles.scss';

export const Posts = ({posts}) => (
    <div className="posts">
        {posts.map(post => (
            <PostCard key={post.id} post={post} />
        ))}
    </div>
);