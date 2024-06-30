"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Input,
  Button,
  Chip,
  Progress,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import { CameraIcon } from "@/components/icons/camera";
import { useEdgeStore } from "@/libs/edgestore";
import { SingleImageDropzone } from "@/components/admin/single-image-dropzone";
import { Billboard } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import BackArrowIcon from "@/components/icons/back";
import { Heading } from "@/components/admin/heading";
import { DeleteIcon } from "@/components/icons/delete";
import ViewModal from "@/components/admin/view-modal";

const formSchema = z.object({
  image: z.string().min(1, { message: "Image required" }),
  title: z.string().min(3, { message: "Title must be filled" }),
});

type BillboardFormProps = {
  initialData: Billboard | null;
};

const BillboardForm = ({ initialData }: BillboardFormProps) => {
  const [progress, setProgress] = useState<number>();
  const [loading, setLoading] = useState(false);
  const { onOpen } = useDisclosure();
  const params = useParams();
  const router = useRouter();

  const { edgestore } = useEdgeStore();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: initialData || {
      image: "",
      title: "",
    },
  });

  const toastMessage = initialData
    ? "Billboard updated successfully"
    : "Billboard added successfully";
  const action = initialData ? "Save changes" : "Create Billboard";
  const title = initialData ? "Edit Billboard" : "Add Billboard";

  const handleImageChange = async (file: File | undefined, field: any) => {
    if (file) {
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          setProgress(progress);
        },
      });
      console.log(res);
      const imageUrl = res.url;
      field.onChange(imageUrl);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/billboards/${params.billboardId}`, data);
      } else {
        await axios.post(`/api/billboards`, data);
      }
      router.replace(`/admin/billboards`);
      router.refresh();
      toast.info(toastMessage);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.warning(error.response.data);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading description="" title={title} />
        <div className="flex items-center justify-center gap-2">
          <Tooltip content="Go Back" size="sm">
            <Button
              isIconOnly
              color="secondary"
              variant="flat"
              onClick={() => {
                router.back();
              }}
              isDisabled={loading}
            >
              <BackArrowIcon />
            </Button>
          </Tooltip>
          {initialData && (
            <Tooltip content="Delete Billboard" size="sm">
              <Button
                isIconOnly
                onClick={() => {}}
                color="danger"
                variant="solid"
                isDisabled={loading}
                onPress={onOpen}
              >
                <DeleteIcon width={20} height={20} />
              </Button>
            </Tooltip>
          )}
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4 place-items-center md:grid-cols-2 lg:grid-cols-3"
      >
        <div className="flex flex-col items-start justify-center w-full md:col-span-2 lg:col-span-3">
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <SingleImageDropzone
                width={200}
                height={200}
                value={field.value}
                onChange={(file) => handleImageChange(file, field)}
              />
            )}
          />
          {progress && (
            <Progress
              aria-label="Uploading..."
              size="sm"
              value={progress}
              showValueLabel
              color="primary"
              className="max-w-[200px]"
            />
          )}
          {errors.image && (
            <Chip color="danger" variant="flat" startContent={<CameraIcon />}>
              {errors.image?.message}
            </Chip>
          )}
        </div>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              id="title"
              label="Title"
              type="text"
              size="sm"
              {...field}
              isInvalid={Boolean(errors.title)}
              errorMessage={errors.title?.message}
            />
          )}
        />
        <Button color="primary" type="submit" isLoading={loading}>
          {action}
        </Button>
      </form>
    </div>
  );
};

export default BillboardForm;
