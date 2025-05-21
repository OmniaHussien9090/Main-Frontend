import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPostById, fetchAllPosts } from "../../../api";
import PostSidebar from "./components/PostSidebar";
import PostContent from "./components/PostContent";
import LoadingIndicator from "./components/LeadingIndicator";
import { FiArrowLeft } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const PostDetails = () => {
  const { t } = useTranslation("postdetails");
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all posts for sidebar and navigation
  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsData = await fetchAllPosts();
        setPosts(postsData.posts);
      } catch (err) {
        console.error(t("error"), err.message);
      }
    };

    getPosts();
  }, [t]);

  // Fetch single post
  useEffect(() => {
    const getPost = async () => {
      try {
        const postData = await fetchPostById(id);
        setPost(postData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getPost();
  }, [id]);

  if (loading) return <LoadingIndicator />;
  if (error)
    return (
      <div className="text-red-500 py-8 mt-10">
        {t("error")}: {error}
      </div>
    );
  if (!post)
    return <div className="py-8">{t("postNotFound")}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-10">
      <Link to={`/blog`}>
        <button className="flex items-center text-gray-600 hover:text-black mb-6 transition-all duration-300 group cursor-pointer">
          <FiArrowLeft className="mr-2 transition-all duration-300 group-hover:-translate-x-1" />
          <span>{t("backToPosts")}</span>
        </button>
      </Link>
      <div className="flex flex-col lg:flex-row gap-8 ">
        <PostSidebar
          posts={posts}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <PostContent post={post} posts={posts} />
      </div>
    </div>
  );
};

export default PostDetails;
