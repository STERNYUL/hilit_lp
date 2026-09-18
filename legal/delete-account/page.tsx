import Link from 'next/link';

export const metadata = { title: '계정 및 데이터 삭제' };

export default function DeleteAccountPage() {
  return (
    <main className="legal-page">
      <h1>HILIT 계정 및 데이터 삭제</h1>
      <p className="legal-meta">앱을 삭제한 뒤에도 이 페이지에서 요청할 수 있습니다.</p>

      <h2>앱 또는 웹에 로그인할 수 있을 때</h2>
      <ol>
        <li>HILIT에 로그인합니다.</li>
        <li><b>프로필 → 설정 → 회원 탈퇴</b>를 누릅니다.</li>
        <li>화면의 확인 절차를 마치면 계정과 연결된 데이터 삭제가 시작됩니다.</li>
      </ol>

      <h2>로그인할 수 없을 때</h2>
      <p>
        가입한 이메일 주소에서 아래 요청 버튼을 누르거나 privacy@hilit.site로
        메일을 보내 주세요. 비밀번호는 절대 보내지 마세요. 계정 소유 확인에 필요한
        최소 정보만 추가로 요청할 수 있습니다.
      </p>
      <p>
        <a href="mailto:privacy@hilit.site?subject=HILIT%20계정%20및%20데이터%20삭제%20요청&body=가입한%20이메일:%0A표시%20이름:%0A삭제를%20요청합니다.">
          계정 및 데이터 삭제 요청 메일 보내기
        </a>
      </p>

      <h2>삭제되는 데이터</h2>
      <ul>
        <li>계정과 프로필 정보</li>
        <li>게시물·댓글·메시지와 업로드한 사진·영상</li>
        <li>팔로우·좋아요·저장·알림 설정 등 계정에 연결된 활동 정보</li>
      </ul>
      <p>
        법적 의무, 보안, 사기·악용 방지를 위해 일부 기록을 보관해야 하는 경우에는
        목적과 기간을 안내하고 해당 기간이 끝난 뒤 삭제합니다.
      </p>

      <p style={{ marginTop: '2rem' }}>
        <Link href="/legal/privacy">개인정보처리방침</Link>{' · '}
        <Link href="/legal/terms">이용약관</Link>
      </p>
    </main>
  );
}
