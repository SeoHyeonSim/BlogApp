import React, { useState, useEffect, useRef } from "react";

import { submitComment } from "@/services";

const CommentsForm = ({ slug }) => {
    const [error, setError] = useState(false);
    const [localStorage, setLocalStorage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [formData, setFormData] = useState({
        name: null,
        email: null,
        comment: null,
        storeData: false,
    });

    const commentEl = useRef();
    const nameEl = useRef();
    const eamilEl = useRef();
    const storeDataEl = useRef();

    useEffect(() => {
        nameEl.current.value = window.localStorage.getItem("name");
        eamilEl.current.value = window.localStorage.getItem("email");
    }, []);

    const handleCommentSubmission = () => {
        setError(false);
        const { value: comment } = commentEl.current;
        const { value: name } = nameEl.current;
        const { value: email } = eamilEl.current;
        const { checked: storeData } = storeDataEl.current;

        if (!comment || !name || !email) {
            setError(true);
            return;
        }

        const commentObj = {
            name,
            email,
            comment,
            slug,
        };

        if (storeData) {
            window.localStorage.setItem("name", name);
            window.localStorage.setItem("email", email);
        } else {
            window.localStorage.removeItem("name", name);
            window.localStorage.removeItem("email", email);
        }

        submitComment(commentObj).then((res) => {
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
        });
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className=" text-xl mb-8 font-semibold border-b pb-4">
                Leave a Reply
            </h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <textarea
                    ref={commentEl}
                    className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    name="comment"
                    placeholder="Comment"
                />
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <input
                    type="text"
                    ref={nameEl}
                    className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    placeholder="name"
                    name="name"
                />
                <input
                    type="email"
                    ref={eamilEl}
                    className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    placeholder="email"
                    name="email"
                />
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                    <input
                        type="checkbox"
                        ref={storeDataEl}
                        id="storeData"
                        name="storeData"
                        value="true"
                    />
                    <label>
                        Save my name, email in this browser for the next time I
                        comment.
                    </label>
                </div>
            </div>
            {error && (
                <p className="text-xs text-red-500">
                    All fieldss are required.
                </p>
            )}
            <div className="mt-8">
                <button
                    type="button"
                    onClick={handleCommentSubmission}
                    className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
                >
                    Post Comment
                </button>
                {showSuccessMessage && (
                    <span className="text-xl float-right font-semibold mt-3 text-green-500">
                        Comment Submitted!
                    </span>
                )}
            </div>
        </div>
    );
};

export default CommentsForm;
