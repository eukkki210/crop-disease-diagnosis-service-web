import React, { useState, ChangeEvent, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage, faCamera, faStethoscope } from '@fortawesome/free-solid-svg-icons';
import './Diagnosis.css';
import { Link } from 'react-router-dom';

const Diagnosis = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [diagnosisResult, setDiagnosisResult] = useState<{ captions: string; detections: ReactNode; disease: string } | null>(null);
    const [isDiagnosing, setIsDiagnosing] = useState(false);
    const [isDiagnosisCompleted, setIsDiagnosisCompleted] = useState(false);

    useEffect(() => {
        console.log(selectedImage);
    }, [selectedImage]);

    const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleDiagnose = () => {
        if (!selectedImage) {
            return;
        }

        setIsDiagnosing(true);
        setDiagnosisResult({ captions: '인식 중...', detections: <img src="" alt="Detected Crop" />, disease: '' });

        const formData = new FormData();
        formData.append('image', selectedImage);

        axios.post('diagnosis/upload', formData)
            .then((res) => {
                const diagnosisData = res.data;
                console.log(diagnosisData)

                const base64Image = diagnosisData.detections;

                const diagnosisImage = (
                    <img src={`data:image/jpeg;base64, ${base64Image}`} alt="Detected Crop" />
                );

                const pattern = /(\S+병)/;
                const match = diagnosisData.captions.match(pattern);
                const diseaseName = match ? match[1] : '병명을 찾을 수 없습니다';

                setDiagnosisResult({
                    captions: diagnosisData.captions,
                    detections: diagnosisImage,
                    disease: diseaseName,
                });

                setIsDiagnosing(false);
                setIsDiagnosisCompleted(true);
            })
            .catch((error) => {
                console.error('진단 요청 중 오류 발생:', error);
                setIsDiagnosing(false);
                setDiagnosisResult({ captions: '진단 중 오류가 발생했습니다...', detections: <img src="" alt="Detected Crop" />, disease: '' });

                setIsDiagnosisCompleted(true);
            });
    };

    const handleRediagnose = () => {
        setSelectedImage(null);
        setIsDiagnosisCompleted(false);
        setDiagnosisResult(null);
    };

    return (
        <div className="diagnosis">
            {isDiagnosisCompleted ? (
                diagnosisResult && isDiagnosisCompleted && (
                    <div className="diagnosis-result">
                        <h1>진찰 결과: {diagnosisResult.disease}</h1>
                        <p>{diagnosisResult.captions}</p>
                        <Link to={`/disease/${encodeURIComponent(diagnosisResult.disease)}`}>질병 자세히 알아보기</Link>
                        {diagnosisResult.detections}
                        <p>※ 이미지에 테두리 상자가 쳐져 있는 것은 환부를 표시합니다</p>
                        <button onClick={handleRediagnose} className="rediagnose-button">다시 진단하기</button>
                    </div>
                )
            ) : isDiagnosing ? (
                <div className="diagnosis-loading">
                    진찰 중...
                </div>
            ) : (
                <div className="select-container">
                    <h2>진찰 받을 식물 사진을 선택해주세요</h2>
                    <div className="image-container">
                        {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Selected" />}
                    </div>
                    <div className="button-container">
                        <input type="file" accept="image/*" onChange={handleImageSelect} id="file-input" hidden />
                        <label htmlFor="file-input">
                            <FontAwesomeIcon icon={faFileImage} size="3x" title="파일 선택" />
                        </label>
                        <button title="직접 사진 찍기">
                            <FontAwesomeIcon icon={faCamera} size="3x" />
                        </button>
                        {selectedImage && (
                            <>
                                <button onClick={handleDiagnose} title="진찰 받기">
                                    <FontAwesomeIcon icon={faStethoscope} size="3x" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Diagnosis;
