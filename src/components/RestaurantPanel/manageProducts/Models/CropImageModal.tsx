import React, { useState } from "react";
import Cropper from 'react-easy-crop';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface CropImageModalProps {
    isOpen: boolean;
    onCancel: () => void;
    setCroppedImageUrl: (croppedImageUrl: strings) => void;
    productImageUrl: string;
    onSet: () => void;
}

const CropImageModal: React.FC<CropImageModalProps> = ({ isOpen, onCancel, setCroppedImageUrl, productImageUrl, onSet }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

    const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
        console.log(croppedArea, croppedAreaPixels);
        setCroppedAreaPixels(croppedAreaPixels); // Save cropped area for later use
    };

    const handleSet = () => {
        if (croppedAreaPixels) {
            const canvas = document.createElement('canvas');
            const image = new Image();
            image.src = productImageUrl;

            image.onload = () => {
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    canvas.width = croppedAreaPixels.width;
                    canvas.height = croppedAreaPixels.height;
                    ctx.drawImage(
                        image,
                        croppedAreaPixels.x,
                        croppedAreaPixels.y,
                        croppedAreaPixels.width,
                        croppedAreaPixels.height,
                        0,
                        0,
                        croppedAreaPixels.width,
                        croppedAreaPixels.height
                    );
                    const croppedImageUrl = canvas.toDataURL('image/jpeg');
                    setCroppedImageUrl(croppedImageUrl);
                }
            };
            onCancel();
        }
    };

    return (
        <Modal
            show={isOpen}
            onHide={onCancel}
            size="lg"
            aria-labelledby="contained-modal-title-sm"
            centered
            className=" advance-btn-modal"
        >
            <Modal.Header className="h-12" closeButton>
                <Modal.Title  id="contained-modal-title-sm">
            <h6>
                    Crop Image

            </h6>

                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="!min-h-full ">
                <div className="!min-h-64">

                <Cropper
                    image={productImageUrl}
                    crop={crop}
                    zoom={zoom}
                    aspect={1 / 1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
                </div>
            </Modal.Body>
            <Modal.Footer className="h-16 flex flex-wrap">
            <div className="grid grid-cols-3 gap-4 sm:px-2">

            {/* <div className="col-span-1"></div> */}
            <div className="col-span-1"></div>
            <div className=" col-span-1 lg:px-2">
                <button className=" btm_button_pro !rounded-md" onClick={onCancel}>Close</button>
            </div>
            <div className="col-span-1">
                <button className=" btm_button_pro !rounded-md" onClick={handleSet}>Set</button>
            </div>
            </div>
            

            </Modal.Footer>
        </Modal>
    );
};

export default CropImageModal;
