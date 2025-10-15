# Edumate

Next.js 기반의 교육용 비디오 공유 플랫폼입니다.

## 개요

Edumate는 Next.js 13과 SQLite를 사용하여 개발된 비디오 공유 플랫폼으로, 사용자 인증, 비디오 업로드, 좋아요 기능 등을 제공합니다. YouTube와 유사한 구조로 교육 콘텐츠를 공유하고 관리할 수 있습니다.

## 주요 기능

### 사용자 기능
- **인증 시스템** - NextAuth를 활용한 로그인/로그아웃
- **비디오 시청** - 스트리밍 비디오 재생
- **좋아요/관심** - 비디오에 좋아요 표시
- **최근 시청** - 최근 본 비디오 목록
- **인기 비디오** - 좋아요 순으로 정렬된 인기 콘텐츠

### 콘텐츠 관리
- **비디오 업로드** - 새로운 비디오 콘텐츠 등록
- **추가 파일** - 비디오와 함께 보조 자료 첨부
- **비디오 수정** - 업로드한 비디오 정보 편집
- **내 비디오** - 사용자별 비디오 관리 대시보드

### 데이터 관리
- **SQLite 데이터베이스** - 경량 데이터베이스로 빠른 개발
- **파일 시스템** - 비디오 및 추가 파일 로컬 저장
- **세션 관리** - NextAuth 기반 인증 상태 관리

## 기술 스택

### Frontend
- **Next.js 13.4.10** - React 프레임워크 (App Router)
- **React 18.2.0** - UI 라이브러리
- **TypeScript 5.1.6** - 타입 안정성
- **Tailwind CSS 3.3.3** - 유틸리티 CSS 프레임워크

### Backend
- **Next.js API Routes** - 서버사이드 API
- **NextAuth 4.22.3** - 인증 라이브러리
- **SQLite3 5.1.6** - 임베디드 데이터베이스
- **bcryptjs 2.4.3** - 비밀번호 암호화

### 파일 처리
- **formidable 3.5.0** - 파일 업로드 처리
- **AWS SDK 2.1420.0** - S3 연동 준비 (선택적)

### 데이터 패칭
- **SWR 2.2.0** - React Hooks 기반 데이터 패칭
- **Axios 1.4.0** - HTTP 클라이언트

## 프로젝트 구조

```
Edumate/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/[...nextauth]/  # 인증 API
│   │   ├── user/info/           # 사용자 정보
│   │   ├── video/               # 비디오 CRUD
│   │   │   ├── route.ts         # 비디오 생성
│   │   │   ├── info/            # 비디오 조회
│   │   │   ├── upload/          # 업로드
│   │   │   ├── modify/          # 수정
│   │   │   ├── good/            # 좋아요
│   │   │   └── etcfile/         # 추가 파일
│   │   └── videos/              # 비디오 목록
│   │       ├── like/            # 좋아요한 비디오
│   │       └── recently/        # 최근 비디오
│   ├── video/[id]/              # 비디오 상세 페이지
│   ├── user/video/              # 사용자 비디오 관리
│   ├── upload/                  # 업로드 페이지
│   ├── layout.tsx               # 루트 레이아웃
│   ├── page.tsx                 # 홈 페이지
│   └── globals.css              # 글로벌 스타일
├── src/
│   ├── components/              # React 컴포넌트
│   │   ├── AuthSession.tsx     # 인증 세션
│   │   ├── Nav.tsx              # 네비게이션
│   │   ├── Description.tsx      # 설명
│   │   └── FileContent.tsx      # 파일 콘텐츠
│   ├── data/                    # 데이터 저장소
│   │   ├── video/               # 비디오 파일
│   │   └── etcfile/             # 추가 파일
│   ├── ts/                      # TypeScript 유틸리티
│   └── db.sqlite                # SQLite 데이터베이스
├── public/                      # 정적 파일
├── package.json                 # 프로젝트 설정
├── tsconfig.json                # TypeScript 설정
├── tailwind.config.js           # Tailwind 설정
└── next.config.js               # Next.js 설정
```

## 설치 및 실행

### 사전 요구사항
- Node.js 18 이상
- npm 또는 yarn

### 1. 저장소 클론

```bash
git clone https://github.com/herbpot/Edumate.git
cd Edumate
```

### 2. 의존성 설치

```bash
npm install
# or
yarn install
```

### 3. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수를 설정:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Database
DATABASE_URL=file:./src/db.sqlite

# Optional: AWS S3 (파일 저장소)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=ap-northeast-2
```

### 4. 개발 서버 실행

```bash
npm run dev
# or
yarn dev
```

브라우저에서 http://localhost:3000 으로 접속

### 5. 프로덕션 빌드

```bash
npm run build
npm start
```

## API 엔드포인트

### 인증
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET/POST | `/api/auth/[...nextauth]` | NextAuth 인증 |
| GET | `/api/user/info` | 사용자 정보 조회 |

### 비디오
| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/api/video` | 비디오 생성 |
| GET | `/api/video/info?id=<id>` | 비디오 정보 조회 |
| POST | `/api/video/upload` | 비디오 파일 업로드 |
| PUT | `/api/video/modify` | 비디오 정보 수정 |
| POST | `/api/video/good` | 좋아요 토글 |
| POST | `/api/video/etcfile` | 추가 파일 업로드 |

### 비디오 목록
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/videos/like` | 좋아요한 비디오 목록 |
| GET | `/api/videos/recently` | 최근 업로드된 비디오 |

## 주요 페이지

### 홈 페이지 (`/`)
- 전체 비디오 목록
- 비디오 카드 그리드 뷰
- 네비게이션 바

### 비디오 상세 (`/video/[id]`)
- 비디오 플레이어
- 비디오 정보 및 설명
- 좋아요 버튼
- 추가 파일 다운로드

### 업로드 페이지 (`/upload`)
- 비디오 파일 선택
- 제목, 설명 입력
- 추가 파일 업로드

### 내 비디오 (`/user/video`)
- 사용자가 업로드한 비디오 목록
- 비디오 수정/삭제 기능

### 좋아요 목록 (`/video/like`)
- 사용자가 좋아요한 비디오 목록

## 데이터베이스 스키마

### users 테이블
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### videos 테이블
```sql
CREATE TABLE videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    filename TEXT NOT NULL,
    user_id INTEGER,
    likes INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## 개발 팁

### 파일 업로드 처리
```typescript
// formidable을 사용한 멀티파트 폼 처리
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};
```

### SWR 데이터 패칭
```typescript
import useSWR from 'swr';

const { data, error } = useSWR('/api/videos/recently', fetcher);
```

### NextAuth 세션 사용
```typescript
import { useSession } from 'next-auth/react';

const { data: session } = useSession();
```

## 특징

- **App Router**: Next.js 13의 최신 라우팅 시스템
- **Server Components**: 성능 최적화된 서버 컴포넌트
- **TypeScript**: 전체 프로젝트에 타입 안정성
- **Tailwind CSS**: 빠른 스타일링 및 반응형 디자인
- **SQLite**: 별도 DB 서버 불필요
- **Progressive Enhancement**: JavaScript 비활성화 시에도 동작

## 보안 고려사항

⚠️ **주의**: 교육용 프로젝트로 다음 보안 개선이 필요합니다:

1. **환경 변수**: NEXTAUTH_SECRET을 강력한 키로 설정
2. **파일 검증**: 업로드 파일 타입 및 크기 검증 강화
3. **SQL Injection**: Prepared Statements 사용
4. **Rate Limiting**: API 호출 제한
5. **CORS**: 적절한 CORS 정책 설정

## 향후 계획

- [ ] AWS S3 연동으로 파일 저장 확장
- [ ] 댓글 시스템
- [ ] 구독 기능
- [ ] 재생 목록
- [ ] 검색 기능
- [ ] 추천 알고리즘
- [ ] 비디오 트랜스코딩
- [ ] 실시간 스트리밍

## 문제 해결

### SQLite 에러
```bash
npm rebuild sqlite3
```

### 파일 업로드 실패
- 파일 크기 제한 확인
- `next.config.js`에서 `api.bodyParser` 설정 확인

## 라이선스

교육 목적으로 작성된 프로젝트입니다.

## 기여

이슈 및 Pull Request는 언제나 환영합니다!
