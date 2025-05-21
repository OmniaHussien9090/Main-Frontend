import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import Message from "../../../../assets/icons/message.svg";
import { useTranslation } from "react-i18next";
import i18n from "../../../../i18n"; 

const BlogPost = ({ post }) => {
  const { t } = useTranslation("blog");
  const currentLanguage = i18n.language;
  const [hovered, setHovered] = useState(false);

  return (
    <article className="mb-12 mt-10 p-8">
      {post.image && (
        <Link to={`/blog/${post._id}`}>
          <img
            src={post.image}
            className="w-full md:h-100 h-50 object-cover mb-4"
          />
        </Link>
      )}

      <div className="flex flex-wrap items-center text-sm text-gray-500 mb-2 gap-2">
        <span>
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
        <span>|</span>
        <span>
          {post.tags ? post.tags.join(", ") : t("blogPost.defaultTags")}
        </span>
        <span>|</span>
        <span>
          {t("blogPost.by")} {post.author || "sorouah money"}
        </span>
        <span>|</span>
        <div
          className="relative flex items-center gap-1"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <CiHeart className="h-5 w-5" />
          <span>{post.likes.length}</span>
          {hovered && post.likes.length > 0 && (
            <div className="absolute top-6 left-0 mb-2 p-2 bg-black/50 text-white shadow-lg z-10 min-w-[150px]">
              <h4 className="font-medium text-sm mb-1">{t("blogPost.likedBy")}:</h4>
              <ul className="text-xs">
                {post.likes.map((like) => (
                  <li key={like._id} className="py-1">
                    {like.user}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <span>|</span>
        <span className="flex items-center gap-1">
          <img src={Message} alt="message" className="w-5 h-5" />
          {post.comments.length}
        </span>
      </div>

      <Link to={`${post._id}`}>
        <h2 className="text-2xl text-heading-blog font-bold mb-4">
          {post.title[currentLanguage] || post.title.ar || t("blogPost.defaultTitle")}
        </h2>
      </Link>

      <p className="text-gray-500 mb-4">
        {post.content[currentLanguage] || post.content.ar || t("blogPost.defaultContent")}
      </p>

      <Link
        to={`/blog/${post._id}`}
        className="text-read-more underline underline-offset-4 font-medium"
      >
        {t("blogPost.readMore")}
      </Link>
    </article>
  );
};

export default BlogPost;
