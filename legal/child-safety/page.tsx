import Link from 'next/link';

export const metadata = { title: '아동 안전 표준' };

export default function ChildSafetyPage() {
  return (
    <main className="legal-page">
      <h1>HILIT 아동 안전 표준</h1>
      <p className="legal-meta">시행일 2026년 9월 8일 · 판 v1</p>

      <p>
        HILIT은 아동·청소년 성적 학대와 착취(CSAE), 성착취물(CSAM), 그루밍,
        성적 협박과 인신매매를 허용하지 않습니다. 이 기준은 게시물·댓글·프로필·메시지와
        링크를 포함해 HILIT에서 이용자가 만들거나 공유하는 모든 콘텐츠에 적용됩니다.
      </p>

      <h2>1. 금지되는 행위</h2>
      <ul>
        <li>아동·청소년의 성적 학대나 착취를 묘사·조장·알선하는 콘텐츠</li>
        <li>아동·청소년에게 성적 대화·사진·만남을 요구하는 그루밍</li>
        <li>성적 이미지로 협박하거나 금품·추가 이미지를 요구하는 행위</li>
        <li>실제 또는 합성된 아동·청소년 성착취물의 제작·보관·공유</li>
      </ul>

      <h2>2. 앱 안에서 신고하는 방법</h2>
      <ol>
        <li>문제가 있는 게시물·댓글·사용자의 <b>···</b> 메뉴를 누릅니다.</li>
        <li><b>신고</b>를 누르고 <b>아동·청소년 성착취</b>를 선택합니다.</li>
        <li>즉시 위험한 상황이면 서비스 신고와 별개로 현지 긴급기관에 연락합니다.</li>
      </ol>
      <p>앱 안에서 신고할 수 없으면 support@hilit.site로 알려 주세요.</p>

      <h2>3. HILIT의 대응</h2>
      <ul>
        <li>신고된 콘텐츠의 접근을 제한하고 운영자가 우선 검토합니다.</li>
        <li>위반이 확인되면 콘텐츠 삭제, 기능 제한 또는 계정 정지를 적용합니다.</li>
        <li>관련 법률이 요구하는 범위에서 기록을 보존하고 관할 기관에 신고합니다.</li>
        <li>신고자의 정보는 법률상 요구되는 경우를 제외하고 신고 대상에게 공개하지 않습니다.</li>
      </ul>

      <h2>4. 연락처</h2>
      <p>
        아동 안전 신고·정책 문의:{' '}
        <a href="mailto:support@hilit.site?subject=HILIT%20아동%20안전%20신고">support@hilit.site</a>
      </p>

      <p style={{ marginTop: '2rem' }}>
        <Link href="/legal/terms">이용약관</Link>{' · '}
        <Link href="/legal/privacy">개인정보처리방침</Link>
      </p>
    </main>
  );
}
