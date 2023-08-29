"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();

  const [submitting, Setsubmitting] = useState(false);
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [post, setPost] = useState({
    prompt: "",
    tag: "",
    creator: {
      username: promptId?.user?.name,
      image: promptId?.user?.image,
      email: promptId?.user?.email,
    },
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    Setsubmitting(true);
    if (!promptId) return alert("Prompt Id Not Found");
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          creator: post.creator,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      Setsubmitting(false);
    }
  };

  return (
    <div>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </div>
  );
};

export default EditPrompt;
