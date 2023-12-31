"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, Setsubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
    creator: {
      username: session?.user.name,
      image: session?.user.image,
      email: session?.user.email,
    },
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    Setsubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
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
        type="create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
    </div>
  );
};

export default CreatePrompt;
