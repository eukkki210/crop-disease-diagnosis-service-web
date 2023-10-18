import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DiseaseInfo.css';

interface DiseaseInfoMap {
    [key: string]: {
        description: string;
        additionalInfo: string[];
    };
}

function DiseaseInfo() {
    const { disease } = useParams<{ disease?: string }>();
    const navigate = useNavigate();
    // const [diseaseInfo, setDiseaseInfo] = useState<any>(null);

    const diseaseInfoMap: DiseaseInfoMap = {
        '잎곰팡이병': {
            description: '잎곰팡이병은 잎에 발생합니다. 처음에는 잎의 표면에 흰색 또는 담회색의 반점으로 나타나고 진전되면 황갈색 병반으로 확대됩니다. 잎 뒷면에 담갈색의 병반이 형성되는데, 병반상에는 갈색의 곰팡이가 융단처럼 밀생되어 있는 것을 볼 수 있으며, 오래되면 균총이 갈색에서 연한 자색으로 변합니다. 주로 아래 잎에서 피해가 크며, 심하면 아랫잎 전체가 누렇게되고 말라 죽습니다.',
            additionalInfo: [
                '발생환경:',
                '- 병원균은 병든 잎이나 종자 등에서 겨울을 지내고 1차 전염원이 되나, 시설재배에서는 병원균이 각종 농자재에 붙어 겨울을 지내기도 합니다.',
                '- 2차 전염은 병반상에 형성된 포자가 전반되어 잎의 기공을 통하여 침입하여 발병됩니다.',
                '- 20~25°C의 온도조건하에서 피해가 크며, 특히 시설재배지에서 심하게 발생합니다.',
                '방제방법:',
                '- 병든 잎을 신속히 제거합니다.',
                '- 90% 이상의 상대습도가 유지되지 않도록 합니다.',
                '- 통풍이 잘되게 하고 밀식하지 않습니다.',
                '- 건전한 종자를 사용하고, 깨끗한 자재를 사용합니다.',
                '- 질소질 비료의 과용을 피합니다.',
            ],
        },
        '고추흰가루병': {
            description: '흰가루병은 주로 잎에 발생합니다. 처음에는 잎 뒷면의 엽맥을 따라 얇은 서릿발 모양의 포자가 밀생하고, 진전되면 그 부분의 표면에 담황색의 병무늬가 형성됩니다. 심하게 발생하면 잎이 고사되어 떨어지고, 끝부분의 새로 나온 잎만 남게 됩니다.',
            additionalInfo: [
                '발생환경:',
                '- 고추와 오크라, 토마토, 가지, 오이 등이 병 발생 기주로 알려져 있습니다.',
                '- 시설재배지와 가을 날씨가 건조할 때 심하게 발생합니다.',
                '- 분생포자는 공기전염되며, 건조한 조건하에서는 80일간 전염원 능력이 유지됩니다.',
                '- 흰가루병균은 하우스 내에서도 난방기가 설치된 곳이나 남쪽 출입구 부근에서 많이 발생하는 것을 볼 수 있습니다.',
                '방제방법:',
                '- 병든 잎은 일찍 제거하여 초기 전염원을 없앱니다.',
                '- 질소비료의 지나친 사용을 피하고 과번무 하지 않게 관리합니다.',
                '- 다소 건조하고 서늘한 조건에서 많이 발생하므로, 다른 병의 발생을 조장하지 않는한 온도와 습도를 높여줍니다.',
                '- 내부기생성 병원균이므로 침투이행성 등록약제를 살포합니다.',
                '- 발병 초 예방적으로 등록약제를 살포하는 것이 효과적입니다.',
            ],
        },
    };

    // useEffect(() => {
    //     const mockApiRequest = async () => {
    //         try {
    //             const response = await fetch(`/api/disease/${disease}`);
    //             const data = await response.json();
    //             setDiseaseInfo(data);
    //         } catch (error) {
    //             console.error('Error fetching disease info:', error);
    //         }
    //     };

    //     mockApiRequest();
    // }, [disease]);

    const diseaseName = disease ? decodeURIComponent(disease) : '';

    const diseaseInfo = diseaseInfoMap[diseaseName];

    if (!diseaseInfo) {
        return <div>
            <button onClick={() => navigate(-1)} className="go-back-button">
                뒤로 가기
            </button>
            질병 정보를 찾을 수 없음
        </div>;
    }

    return (
        <div className="disease-info">
            <button onClick={() => navigate(-1)} className="go-back-button">
                뒤로 가기
            </button>
            <h1 className="disease-title">질병 정보: {diseaseName}</h1>
            <p className="disease-description">{diseaseInfo.description}</p>
            <h2 className="disease-details">자세한 정보:</h2>
            <ul className="disease-info-list">
                {diseaseInfo.additionalInfo.map((info, index) => (
                    <li key={index} className="disease-info-item">
                        {info}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DiseaseInfo;
