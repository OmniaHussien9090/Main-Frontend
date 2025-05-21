// PostComments.jsx
import React, { useState, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import MessageIcon from "../../../../assets/icons/message.svg";
import { api } from "../../../../axios/axios";
import { useTranslation } from "react-i18next";
import i18n from "../../../../i18n";

const PostComments = ({ post }) => {
  const { t } = useTranslation("postdetails");
  const currentLanguage = i18n.language;
  const [showComments, setShowComments] = useState(true);
  const [comments, setComments] = useState(post.comments || []);
  const [commentData, setCommentData] = useState({
    comment: "",
    name: "",
    saveInfo: false,
  });
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  // جلب الكومنتات
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await api.get(`/posts/${post._id}`);
        setComments(res.data.comments || []);
        console.log(setComments);
      } catch (err) {
        setComments([]);
      }
    };
    fetchComments();
  }, [post._id]);

  // حفظ اسم المستخدم لو اختار ذلك
  useEffect(() => {
    const savedInfo = localStorage.getItem("commentUserInfo");
    if (savedInfo) {
      const parsed = JSON.parse(savedInfo);
      setCommentData((prev) => ({
        ...prev,
        name: parsed.name || "",
        saveInfo: false,
      }));
    }
  }, []);

  useEffect(() => {
    if (commentData.saveInfo) {
      localStorage.setItem(
        "commentUserInfo",
        JSON.stringify({
          name: commentData.name,
        })
      );
    }
  }, [commentData.saveInfo, commentData.name]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCommentData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // إرسال الكومنت
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, success: false, error: null });

    const user = localStorage.getItem("user");
    let userId = null;
    let userName = null;
    let userImage = null;
    let userEmail = null;

    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        userId = parsedUser.id;
        userName = parsedUser.userName; // تأكد أن userName موجود في localStorage
        userImage = parsedUser.image;
        userEmail = parsedUser.email;
      } catch (err) {
        console.error("Invalid JSON in localStorage user:", err);
      }
    }

    if (!userId) {
      setSubmitStatus({
        loading: false,
        success: false,
        error: "User ID not found. Please login.",
      });
      return;
    }

    try {
      const res = await api.post(`/posts/comment/${post._id}`, {
        userId,
        comment: commentData.comment,
      });

      setSubmitStatus({ loading: false, success: true, error: null });
      setCommentData((prev) => ({
        ...prev,
        comment: "",
        ...(!prev.saveInfo && { name: "" }),
      }));

      // استخدم بيانات user من الـ API أو من localStorage إذا لم تتوفر
      setComments((prev) => [
        ...prev,
        {
          ...res.data.comment,
          user: res.data.user || {
            userName: userName,
            image: userImage,
            email: userEmail,
          },
        },
      ]);

      setTimeout(() => {
        setSubmitStatus((prev) => ({ ...prev, success: false }));
      }, 2000);
    } catch (err) {
      setSubmitStatus({
        loading: false,
        success: false,
        error: err.response?.data?.message || err.message || t("error"),
      });
    }
  };

  // تحديث الكومنتات عند تغيير البوست أو الكومنتس
  useEffect(() => {
    setComments(post.comments || []);
  }, [post]);

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-lg shadow">
      <button
        onClick={() => setShowComments((prev) => !prev)}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 font-semibold"
      >
        {showComments ? t("hideComments") : t("showComments")}
      </button>

      {showComments && (
        <>
          {/* عرض كل الكومنتات */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <img src={MessageIcon} alt="comments" className="w-5 h-5" />
              {t("comments")}
            </h3>
            {comments.length === 0 ? (
              <p className="text-gray-500">{t("noComments")}</p>
            ) : (
              <ul className="space-y-4">
                {comments.map((c, idx) => {
                  // استخراج الاسم
                  let name =
                    c.user?.userName?.[currentLanguage] ||
                    c.user?.userName?.en ||
                    c.user?.userName?.ar ||
                    c.username ||
                    c.user?.email?.split("@")[0] ||
                    t("anonymous");

                  // استخراج الصورة
                  let image =
                    c.user?.image ||
                    c.user?.avatar ||
                    "https://ui-avatars.com/api/?name=" +
                      encodeURIComponent(name);

                  return (
                    <li
                      key={c._id || idx}
                      className="flex items-start gap-3 bg-gray-50 p-3 rounded"
                    >
                      <img
                        src={image}
                        alt={name}
                        className="w-10 h-10 rounded-full border object-cover"
                      />
                      <div>
                        <div className="font-semibold">{name}</div>
                        <div className="text-gray-700">{c.comment}</div>
                        {/* تم حذف التاريخ هنا */}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* فورم إضافة كومنت */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-gray-100 p-4 rounded"
          >
            {/* تم حذف حقل الاسم */}
            <div>
              <label htmlFor="comment" className="block font-medium mb-1">
                {t("comment.yourComment")}
              </label>
              <textarea
                id="comment"
                name="comment"
                value={commentData.comment}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="saveInfo"
                name="saveInfo"
                checked={commentData.saveInfo}
                onChange={handleInputChange}
              />
              <label htmlFor="saveInfo" className="text-sm">
                {t("comment.savingInfo")}
              </label>
            </div>
            <button
              type="submit"
              disabled={submitStatus.loading}
              className="btn btn-primary px-6 py-2 rounded"
            >
              {submitStatus.loading
                ? t("comment.loading") || "Loading..."
                : t("comment.submit")}
            </button>

            {submitStatus.success && (
              <p className="text-green-600">
                {t("comment.success") || "Comment submitted successfully!"}
              </p>
            )}
            {submitStatus.error && (
              <p className="text-red-500">{submitStatus.error}</p>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default PostComments;
