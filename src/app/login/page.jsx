"use client";

import LoginForm from "@/components/login/LoginForm";
import { useSearchParams } from "next/navigation";
import SuccessDialog from "@/components/layout/SuccessDialog";

const page = () => {
  const searchParams = useSearchParams();
  const open = searchParams.get("open");
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  console.log("open", open);
  console.log("type", type);
  console.log("id", id);
  return (
    <div>
      <SuccessDialog open={open} type={type} id={id} />
      <LoginForm />
    </div>
  );
};

export default page;
