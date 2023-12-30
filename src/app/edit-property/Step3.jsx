import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { imgFields } from "@/app/post-property/Form";
import FileUpload from "@/components/FileUpload";
import Loading from "@/components/Loading";
import { setStep } from "@/redux/reducers/propertyFormReducer";
import { error, success } from "@/components/Toast";
import { propertyBrochure, propertySmallImg } from "@/utils/helper";
import { call, uploadPropImg } from "@/services/api";
import { useRouter } from "next/navigation";

function Step3({ draftData }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { propertyId, type, step } = useSelector((state) => state.propertyForm);
  const [files, setFiles] = useState({});
  const [existingFiles, setExistingFiles] = useState({});
  const [deleteFiles, setDeleteFiles] = useState([]);
  const [imgType, setImgType] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDraftData = () => {
    const data = {};
    if (draftData?.images) {
      draftData.images.map((ele) => {
        if (!data[ele.type]) {
          data[ele.type] = [];
        }
        data[ele.type].push({
          fileType: "img",
          id: ele.id,
          name: ele.img,
          url: propertySmallImg(ele.img),
        });
      });
    }
    if (draftData?.brochure) {
      data["Brochure"] = [
        {
          fileType: "file",
          id: 1,
          name: draftData.brochure,
          url: propertyBrochure(draftData.brochure),
        },
      ];
    }
    setExistingFiles(data);
  };

  useEffect(() => {
    handleDraftData();
  }, [draftData]);

  useEffect(() => {
    type && setImgType(imgFields[type][0] || "");
  }, [type]);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("propId", propertyId);

      for (let i = 0; i < deleteFiles.length; i++) {
        fd.append("deleteFiles", deleteFiles[i]);
      }

      for (const [key, arr] of Object.entries(files)) {
        arr.forEach((ele) => {
          fd.append(key, ele);
        });
      }

      const res = await call(uploadPropImg(fd));

      success(res?.message);

      router.push(`/account/listings`);
    } catch (err) {}
    setLoading(false);
  };

  const handleUpload = (key, val) => {
    if (
      ["Main Image", "Brochure"].includes(imgType) &&
      (val.length > 1 ||
        (existingFiles[imgType] && existingFiles[imgType].length > 0))
    ) {
      return error("Only single file allowed");
    }
    setFiles((prev) => {
      return { ...prev, [key]: val };
    });
  };

  const handleDelete = (key, id) => {
    key !== "Brochure" && setDeleteFiles([...deleteFiles, id]);
    setExistingFiles((prev) => {
      return {
        ...prev,
        [key]: prev[key].filter((ele) => ele.id != id),
      };
    });
  };

  const handleRemove = (key, index) => {
    const newFiles = files[key].filter((f, i) => {
      if (i === index) {
        return false;
      }
      return true;
    });
    setFiles({ ...files, [key]: newFiles });
  };

  return (
    step === 3 && (
      <div>
        <div className="p-form-img-con">
          <div className="p-form-img-sidebar">
            {type &&
              imgFields[type].map((ele, i) => (
                <div
                  key={i}
                  className={`p-form-img-s-item ${
                    ele === imgType ? "active" : ""
                  }`}
                  onClick={() => setImgType(ele)}
                >
                  {ele}
                </div>
              ))}
          </div>
          <div className="p-form-img-uploader">
            {type && (
              <FileUpload
                type={imgType}
                data={files[imgType] || []}
                existingData={existingFiles[imgType] || []}
                handleUpload={handleUpload}
                removeFile={handleRemove}
                deleteFile={handleDelete}
                fileLimit={
                  ["Main Image", "Brochure"].includes(imgType) ? 1 : null
                }
                accept={
                  imgType === "Brochure"
                    ? { "application/pdf": [".pdf"] }
                    : {
                        "image/png": [".png", ".jpg", ".jpeg", ".webp"],
                      }
                }
              />
            )}
          </div>
        </div>
        <div className="p-form-btn-con">
          <Button
            variant="contained"
            size="large"
            sx={{ my: 2 }}
            onClick={() => dispatch(setStep(step - 1))}
            disabled={loading}
          >
            Prev
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ my: 2 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <Loading color="#fff" /> : "Submit"}
          </Button>
        </div>
      </div>
    )
  );
}

export default Step3;
