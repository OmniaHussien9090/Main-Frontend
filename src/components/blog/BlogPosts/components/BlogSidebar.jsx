import React from "react";
import { CiHeart } from "react-icons/ci";
import { RiSearch2Line } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import i18n from "../../../../i18n";
 
 
const BlogSidebar = ({ posts, searchTerm, onSearchChange }) => {
  const { t } = useTranslation("blog");
  const currentLanguage = i18n.language;
 
  // Get 3 most recent posts
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);
 
  return (
    <div className="lg:w-1/4 lg:order-2 order-1 mt-10 p-8">
      <div className="blog-sidebar static">
        <div className="relative">
          <input
            type="text"
            placeholder={t("blogSidebar.searchPlaceholder")}
            className="w-full pl-3 pr-4 py-2 placeholder:text-gray-500 focus:outline-0 border border-gray-300"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <RiSearch2Line className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
        </div>
 
        <div className="md:block hidden mt-6">
          <div>
            <h3 className="text-sm text-gray-500 mb-1">{t("blogSidebar.popularPosts")}</h3>
            <div className="space-y-4">
              {posts
                .filter((post) => post.likes && post.likes.length > 0)
                .sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0))
                .slice(0, 3)
                .map((post) => (
                  <div key={`popular-${post._id}`} className="flex flex-col gap-3">
                    <h4 className="font-medium text-lg line-clamp-2">
                      {post.title?.[currentLanguage] || post.title?.ar || t("blogSidebar.defaultTitle")}
                    </h4>
                    {post.image && (
                      <img
                        src={post.image}
                        className="w-full h-40 object-cover"
                        alt={post.title?.[currentLanguage] || "Blog post"}
                      />
                    )}
                    <div className="flex items-center justify-between">
                      <div className="text-gray-500 text-sm">
                        {post.description?.[currentLanguage] || ""}...
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <CiHeart className="h-5 w-5" />
                        {post.likes?.length || 0}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
 
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">{t("blogSidebar.recentPosts")}</h3>
            <div className="space-y-4">
              {recentPosts.map((post) => {
                const postTitle = post.title?.[currentLanguage] || post.title?.ar || t("blogSidebar.defaultRecentTitle");
                return (
                  <div key={`recent-${post._id}`} className="flex items-center justify-between">
                    <h4 className="text-base text-heading-blog">{postTitle}</h4>
                    <div className="text-xs text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default BlogSidebar;