import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, Input } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import GoogleIcon from "@/components/icons/google";
import { useRouter } from "next/navigation";
import { EyeSlashFilledIcon } from "../icons/eye-slash";
import { EyeFilledIcon } from "../icons/eye";

const formSchema = z.object({
  email: z.string().email().min(1, { message: "Email must be filled" }),
  password: z.string().min(3, { message: "Password must be filled" }),
});

const LoginForm = () => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/admin");
    }
  }, [session?.status, router]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSignin = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credentials");
        }
        if (callback?.ok && !callback?.error) {
          toast.info("Logged in");
          router.push("/admin");
          reset();
        }
      })
      .finally(() => setIsLoading(false));
  };

  const socialAction = async (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credentials");
        }
        if (callback?.ok && !callback?.error) {
          toast.info("Logging in...");
          // reset();
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form
      onSubmit={handleSubmit(onSignin)}
      className="flex flex-col gap-4 h-[330px]"
    >
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            isRequired
            label="Email"
            type="text"
            size="sm"
            {...field}
            isInvalid={Boolean(errors.email)}
            errorMessage={errors.email?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            isRequired
            label="Password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            size="sm"
            {...field}
            isInvalid={Boolean(errors.password)}
            errorMessage={errors.password?.message}
          />
        )}
      />
      <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
        Log in
      </Button>
      <Divider />
      <div className="flex justify-center items-center flex-col gap-2">
        <p className="text-center text-small">OR login with Google</p>
        <Button
          isIconOnly
          aria-label="Login with Google"
          variant="faded"
          size="lg"
          onClick={() => socialAction("google")}
        >
          <GoogleIcon />
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
