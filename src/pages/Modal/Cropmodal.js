import Modal from "react-bootstrap/Modal"
import React, { useState, useEffect } from "react"
import Cropper from "react-cropper"
import "cropperjs/dist/cropper.css"
import "../../assets/scss/custom/pages/_modal.scss"

const Cropmodal = props => {
  const [image, setImage] = useState("")
  const [cropData, setCropData] = useState("#")
  const [cropper, setCropper] = useState()
  //   const [data, setData] = useState();

  //   console.log(data, "hhh");
  const onChange = e => {
    e.preventDefault()
    let files
    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    }
    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  useEffect(() => {
    if (props?.tempImage) {
      onChange(props?.tempImage)
    }
  }, [props.tempImage])

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL())
      props.setPest(cropper.getCroppedCanvas().toDataURL())

      props.onHide()
    }
  }

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div style={{ width: "100%" }}>
            <Cropper
              style={{ height: 300, width: "100%" }}
              zoomTo={0.5}
              initialAspectRatio={1}
              preview=".img-preview"
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              onInitialized={instance => {
                setCropper(instance)
              }}
              guides={true}
            />
          </div>
          <div>
            <h1>
              <button className="btn btn-primary" onClick={getCropData}>
                Crop Image
              </button>
            </h1>
          </div>
        </div>
        <br style={{ clear: "both" }} />
      </Modal.Body>
    </Modal>
  )
}

export default Cropmodal
