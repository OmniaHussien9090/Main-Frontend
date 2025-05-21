import React from "react";
import { Link } from "react-router-dom";
import i18n from "../../../../i18n";
import { useTranslation } from "react-i18next";
const PostNavigation = ({ postId, posts }) => {
  const { t } = useTranslation("postdetails");
  const currentIndex = posts.findIndex((p) => p._id === postId);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < posts.length - 1;
const currentLanguage = i18n.language;
  return (
    <div className="flex justify-between items-center mt-12 border-t border-b border-gray-200 py-6">
  {hasPrevious && (
    <Link
      to={`/blog/${posts[currentIndex - 1]._id}`}
      className="flex items-center gap-3 text-gray-700"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 bg-gray-200"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      <img
        src={posts[currentIndex - 1].image || "/default-post.jpg"}
        alt="Previous Post"
        className="w-32 h-20 object-cover rounded-md border"
      />
      <div>
        <p className="font-medium line-clamp-1 max-w-[150px]">
          {posts[currentIndex - 1].title?.[currentLanguage] ||
            posts[currentIndex - 1].title?.ar ||
            "Previous Post"}
        </p>
        <span className="text-xs text-gray-500">{t("previous")}</span>
      </div>
    </Link>
  )}

  {hasNext && (
    <Link
      to={`/blog/${posts[currentIndex + 1]._id}`}
      className="flex items-center gap-3 text-gray-700"
    >
      <div className="text-right">
        <p className="font-medium line-clamp-1 max-w-[150px]">
          {posts[currentIndex + 1].title?.[currentLanguage] ||
            posts[currentIndex + 1].title?.ar ||
            "Next Post"}
        </p>
        <span className="text-xs text-gray-500">{t("next")}</span>
      </div>
      <img
        src={posts[currentIndex + 1].image || "/default-post.jpg"}
        alt="Next Post"
        className="w-32 h-20 object-cover rounded-md border"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 bg-gray-200"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </Link>
  )}
</div>


  );
};

export default PostNavigation;