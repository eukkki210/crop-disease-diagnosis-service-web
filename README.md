# 🌱내 손안의 식물의사: 닥터 쑥쑥

> 딥러닝 기반 이미지 캡셔닝과 객체 인식을 이용한 작물 질병 진단 서비스를 위한 **웹 애플리케이션**
> 
> https://github.com/DI-LEE/crop-disease-diagnosis-service/tree/main 모델 활용 웹 서비스 이식 개인 풀스택 프로젝트

## 개요
* 프로젝트 지속 기간: 2023.10~
* 개발 언어: TypeScript & Python
* 개발 목적: TypeScript, NestJS, MongoDB, React 사용 경험 및 숙련도 향상, js 기반 웹 애플리케이션에 ai 모델 이식 경험

## 배포 주소
> https://drssukssuk.site/

## 시작하기

### 사전 요구 사항

* `typescript: "^5.3.3"`
* `nestjs: "^10.0.2"`
* `mongoose: "^8.0.3"`
* `python: "^3.9.13"`
* `flask: "^3.0.0"`
* `tensorflow-gpu: "^2.8.0"`
* `torch: "^1.12.1"`

### 설치

```
# NestJS 설치
npm install -g @nestjs/cli

# 의존성 설치
npm install
```

### AI 모델 요구 사항

> 참고: https://github.com/DI-LEE/crop-disease-diagnosis-service/tree/main?tab=readme-ov-file#requirements

```
pip install -r requirements.txt
```

## 배포

```
# 백엔드 서버 실행
cd server
npm start

# AI 모델 서버 실행
# 요구 사항 설치 후 가상 환경 사용
cd ai_models
source myenv/bin/activate
python app.py
```

## 기술 스택

* [NestJS](https://nestjs.com) - 백엔드 서버 웹 프레임워크
* [MongoDB](https://www.mongodb.com/ko-kr) - 데이터베이스
* [Flask](https://flask-docs-kr.readthedocs.io/ko/latest/quickstart.html) - AI 모델 서버 웹 프레임워크
* [React](https://ko.legacy.reactjs.org/) - 프론트엔드 개발 라이브러리

## 기여자

류승기 - 풀스택 개발 - [깃허브 프로필](https://github.com/eukkki210)
돋을볕 - 원본 AI 모델 소스 - [crop-disease-diagnosis-service](https://github.com/DI-LEE/crop-disease-diagnosis-service)

## 저작권

> 이 프로젝트는 MIT 라이선스에 따라 라이선스가 부여됩니다. - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하십시오.
