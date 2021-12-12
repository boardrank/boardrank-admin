<p align="center">
  <a href="https://boardrank.kr" target="blank"><img src="https://raw.githubusercontent.com/boardrank/boardrank-admin/main/docs/Board%20Rank.svg" width="400" alt="Board Rank Logo" /></a>
</p>

# Boardrank Admin

## Description

이 프로젝트는 Boardrank Admin Web Service 입니다.

## Skill

- React(Create React App)
- Typescript
- Open API Generator
- Recoil

## Usage

### OpenAPI를 이용한 객체 생성

[API 서버](https://api.boardrank.kr/swagger-ui-json)에서 프로젝트에 사용할 class 및 interface를 생성하는 스크립트

```bash
# development mode
yarn generate:dev

# production mode
yarn generate:prod
```

### Build

```bash
yarn build
```

### Development Enviorment

```bash
yarn start
```

### Production Environment

```bash
# serve가 설치되지 않았을 경우 실행
yarn global add serve
serve -s build
```
