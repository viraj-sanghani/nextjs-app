"use client";

import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { error } from "@/components/Toast";
import Loading from "@/components/Loading";
import icons from "@/utils/icons";

function FileUpload({
  type,
  data,
  existingData = [],
  handleUpload,
  removeFile = null,
  deleteFile = null,
  fileSize = 2,
  fileLimit = 100,
  accept,
}) {
  const dragRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const onDragEnter = () => {
    dragRef.current.classList.add("active");
  };
  const onDragLeave = () => {
    dragRef.current.classList.remove("active");
  };
  const onDropRejected = (e) => {
    e.map((f) => {
      if (f.errors[0].code === "file-too-large") {
        error(`${f.file.name} is larger than ${fileSize} MB`);
      } else if (f.errors[0].code === "file-invalid-type") {
        error(
          `${f.file.name} is Invalid. File type must be ${Object.values(
            accept
          ).map((ele) => ele.join(", "))}`
        );
      } else if (f.errors[0].code === "too-many-files") {
        error(`${f.file.name} is rejected. ${f.errors[0].message}`);
      } else {
        error("🚀 - error:", f);
      }
    });
  };

  const onDrop = async (acceptedFiles) => {
    onDragLeave();
    setLoading(true);

    try {
      const dt = [];

      for (let i = 0; i < acceptedFiles.length; i++) {
        try {
          const d = acceptedFiles[i];
          d.preview = await convertToURL(d);
          d.fileType = [
            "image/png",
            "image/jpg",
            "image/jpeg",
            "image/webp",
          ].includes(d.type)
            ? "img"
            : "file";
          dt.push(d);
        } catch (err) {}
      }

      handleUpload(type, [...data, ...dt]);
    } catch (err) {
      error(err);
    }
    setLoading(false);
  };

  const convertToURL = (file) => {
    return new Promise((resolve, reject) => {
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = () => {
          reject();
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const config = {
    onDragEnter: onDragEnter,
    onDragLeave: onDragLeave,
    onDropRejected: onDropRejected,
    onDrop: onDrop,
    maxSize: fileSize * 1000000,
    maxFiles: fileLimit,
    accept: accept,
  };

  const { getRootProps, getInputProps } = useDropzone(config);

  return (
    <>
      <div {...getRootProps({ className: "m-dropzone" })} ref={dragRef}>
        <input {...getInputProps()} />
        Drag and drop files here, or click to select files
      </div>
      <div className="m-p-con">
        <h5>Preview</h5>
        <div className="m-p-wrap">
          {existingData.length > 0 &&
            existingData.map((ele, i) => (
              <div className="m-p-item" key={i} title={ele.name}>
                <div
                  className="m-p-i-delete-btn"
                  onClick={() => deleteFile(type, ele?.id)}
                >
                  {icons.close}
                </div>
                <a href={ele?.url} target="_blank">
                  {ele.fileType === "img" ? (
                    <div className="m-p-img-con">
                      <img src={ele?.url} />
                    </div>
                  ) : (
                    <object data={ele.url} width="300px" height="200px">
                      <p>This browser does not support preview.</p>
                    </object>
                  )}
                  <div className="m-p-img-name">{ele.name}</div>
                </a>
              </div>
            ))}
          {data.length > 0 &&
            data.map((ele, i) => (
              <div className="m-p-item" key={i} title={ele.path}>
                <div
                  className="m-p-i-delete-btn"
                  onClick={() => removeFile(type, i)}
                >
                  {icons.close}
                </div>
                <a href={ele.preview} target="_blank">
                  {ele.fileType === "img" ? (
                    <div className="m-p-img-con">
                      <img src={ele.preview} />
                    </div>
                  ) : (
                    <object data={ele.preview} width="300px" height="200px">
                      <p>This browser does not support preview.</p>
                    </object>
                  )}
                  <div className="m-p-img-name">{ele.path}</div>
                </a>
              </div>
            ))}
          {data.length == 0 && existingData.length == 0 && (
            <div className="no-files">No files to preview</div>
          )}
          {loading && (
            <div style={{ position: "relative", width: 150, height: 100 }}>
              <Loading />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FileUpload;
