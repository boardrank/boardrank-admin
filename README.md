# Boardrank Admin

## Summary

이 프로젝트는 Boardrank Admin 웹 서비스 입니다.

### Skill

- React(CRA)
- Typescript
- Open API Generator

## Usage

### Build

```bash
yarn build
```

### Execution

#### OpenAPI를 이용한 객체 생성

[API 서버](https://api.boardrank.kr/dev/swagger-ui-json)에서 프로젝트에 사용할 class 및 interface를 생성하는 스크립트

```bash
yarn generate:api
```

#### Development Enviorment

```bash
yarn start
```

#### Production Environment

```bash
# serve가 설치되지 않았을 경우 실행
yarn global add serve
serve -s build
```
