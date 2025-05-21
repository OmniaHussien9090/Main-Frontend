import React, { useState, useEffect } from "react";
import { fetchAllPosts } from "../../../api";
import BlogSidebar from "./components/BlogSidebar";
import BlogPost from "./components/BlogPost";
import LoadingSkeleton from "./components/LoadingSkeleton";
import Pagination from "./components/Pagination";
import { useTranslation } from "react-i18next";

const Blog = () => {
  const { t } = useTranslation("blog");

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsData = await fetchAllPosts();
        setPosts(postsData.posts);
        setFilteredPosts(postsData.posts);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPosts(posts);
      setCurrentPage(1);
    } else {
      const filtered = posts.filter((post) => {
        const title = post.title.en || post.title.ar || "";
        const content = post.content.en || post.content.ar || "";
        const tags = post.tags ? post.tags.join(" ") : "";
        const author = post.author || "";

        const searchText = `${title} ${content} ${tags} ${author}`.toLowerCase();
        return searchText.includes(searchTerm.toLowerCase());
      });
      setFilteredPosts(filtered);
      setCurrentPage(1);
    }
  }, [searchTerm, posts]);

  // Pagination calculations
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto px-4 py-8">
      <BlogSidebar
        posts={posts}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder={t("blogSidebar.searchPlaceholder")}
      />

      <div className="lg:w-3/4 lg:order-1 order-2">
        {loading ? (
          <LoadingSkeleton count={3} />
        ) : (
          <>
            {currentPosts
              .filter((post) => post.title.en || post.title.ar)
              .map((post) => (
                <BlogPost key={post._id} post={post} />
              ))}

            {filteredPosts.length > postsPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;
