import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import MessageIcon from "../../../../assets/icons/message.svg";
import PostNavigation from "./PostNavigation";
import PostComments from "./PostComments";
import i18n from "../../../../i18n";
import { api } from "../../../../axios/axios"; // تأكد من وجود هذا الاستيراد

const PostContent = ({ post, posts }) => {
  const [hoveredPostId, setHoveredPostId] = useState(null);
  const [likes, setLikes] = useState(post.likes || []);
  const currentLanguage = i18n.language?.slice(0, 2) === "ar" ? "ar" : "en";

  // معرفة هل المستخدم عمل لايك أم لا
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;

  const isLiked = likes.some(
    (like) => like.user?._id === userId || like.user === userId
  );

  const handleLike = async () => {
    if (!userId) return; // لو مش مسجل دخول
    try {
      await api.put(`/like/${post._id}`, { userId });
      setLikes((prevLikes) => {
        // إذا كان لايك بالفعل، احذفه، لو مش لايك ضيفه
        if (
          prevLikes.some(
            (like) => like.user?._id === userId || like.user === userId
          )
        ) {
          return prevLikes.filter(
            (like) => (like.user?._id || like.user) !== userId
          );
        } else {
          return [
            ...prevLikes,
            {
              user: { _id: userId, userName: user.userName, image: user.image },
            },
          ];
        }
      });
    } catch (err) {
      // يمكنك إضافة توست هنا لو أحببت
    }
  };

  return (
    <div className="lg:w-3/4 lg:order-1 order-2">
      {/* Post Image */}
      {post.image && (
        <img
          src={post.image}
          className="w-full h-auto max-h-[500px] object-cover mb-6"
        />
      )}

      {/* Meta information */}
      <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 gap-2">
        <span>
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
        <span>|</span>
        <span>{post.tags?.join(", ") || "Newest, sofa and chair, wooden"}</span>
        <span>|</span>
        <span>By {post.author || "sorouah money"}</span>
        <span>|</span>
        <div
          className={`relative flex items-center gap-1 cursor-pointer select-none ${
            isLiked ? "text-red-500" : ""
          }`}
          onClick={handleLike}
          onMouseEnter={() => setHoveredPostId(post._id)}
          onMouseLeave={() => setHoveredPostId(null)}
        >
          <CiHeart className="h-5 w-5" />
          <span>{likes.length}</span>
          {hoveredPostId === post._id && likes.length > 0 && (
            <div className="absolute top-6 left-0 mb-2 p-3 bg-base-100 text-gray-800 shadow-lg z-10 min-w-[200px] rounded-lg border border-base-200">
              <h4 className="font-semibold text-sm mb-2 text-secondary">
                Liked by:
              </h4>
              <ul className="space-y-2">
                {likes.map((like, index) => (
                  <li
                    key={like.user?._id || like.user || index}
                    className="flex items-center gap-2"
                  >
                    <div className="avatar">
                      <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          src={like.user?.image || "/default-avatar.png"}
                          alt="user avatar"
                        />
                      </div>
                    </div>
                    <span className="text-sm">
                      {like.user?.userName?.[currentLanguage] || "Anonymous"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <span>|</span>
        <span className="flex items-center gap-1">
          <img src={MessageIcon} alt="message" className="w-5 h-5" />
          {post.comments?.length || 0}
        </span>
      </div>

      {/* Post Content */}
      <div className="mb-8">
        <h1 className="text-3xl text-heading-blog font-bold mb-4">
          {post.title?.[currentLanguage] || "Untitled Post"}
        </h1>

        {post.description && (
          <p className="text-sm text-gray-500 mb-6">
            {post.description?.[currentLanguage] || "No Description"}
          </p>
        )}

        <div className="prose max-w-none">
          <p className="text-gray-800 font-medium whitespace-pre-line">
            {post.content?.[currentLanguage] || "No Content"}
          </p>
        </div>

        <PostNavigation postId={post._id} posts={posts} />
        <PostComments post={post} />
      </div>
    </div>
  );
};

export default PostContent;
