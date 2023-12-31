import React from "react";
import { useRef } from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const TextEditor = ({value,onChange}) => {
   
   
    const modules = {
        toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            // ["link", "image", "video"],
            ["clean"],
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    };
    /*
     * Quill editor formats
     * See https://quilljs.com/docs/formats/
     */
    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video",
    ];



    const disscussion = () => {

    }


    return (
        <>


            <ReactQuill
                style={{ background: "#ffffff", height: "200px" }}
                value={value}
                modules={modules}
                formats={formats}
                onChange={(txt) => onChange(txt)}

            />


            {/* <div className="text-end position-relative">

                <button className="btn btn-primary commnet" onClick={disscussion}>
                    Comment
                </button>

            </div>
            <div>
              <p
                    className=""
                    dangerouslySetInnerHTML={{
                        __html: content,
                    }}
                ></p> 
            </div> */}

        </>
    );
};
export default TextEditor;