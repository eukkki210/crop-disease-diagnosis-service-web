import React, { useState, ChangeEvent } from 'react';

const Diagnosis = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [diagnosisResult, setDiagnosisResult] = useState<string | null>(null);

    const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    const handleDiagnose = () => {
    };

    return (
        <div className="diagnosis">
            <h2>농작물 질병 진단</h2>
            <input type="file" accept="image/*" onChange={handleImageSelect} />
            {selectedImage && <img src={selectedImage} alt="Selected" />}

            <button onClick={handleDiagnose}>진단</button>

            {diagnosisResult && (
                <div className="diagnosis-result">
                    <h3>진단 결과</h3>
                    <p>{diagnosisResult}</p>
                </div>
            )}
        </div>
    );
}

export default Diagnosis;
