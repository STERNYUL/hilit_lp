import { createHash } from 'node:crypto';
import { put } from '@vercel/blob';

// 서비스 준비중 페이지(coming-soon.html)의 출시 알림 신청을 받는다.
// 🔴 저장소는 비공개 Vercel Blob(hilit-waitlist · icn1)이다. 프로젝트에 연결되면서
//    BLOB_READ_WRITE_TOKEN 이 환경 변수로 들어왔다 — put() 이 그 값을 알아서 쓴다.
// 🔴 한 사람당 파일 하나다. 파일 이름이 이메일의 해시라 같은 이메일로 다시 신청하면
//    새 줄이 생기지 않고 최근 신청으로 덮어쓴다. 명단은 tools/export-waitlist.mjs 로 뽑는다.
// 🔴 IP·브라우저 정보는 남기지 않는다. 동의 문구에 적은 항목(이름·이메일·이용 유형)만 받는다.

// 동의 문구를 고치면 이 값도 올린다 — 누가 어느 문구에 동의했는지 명단에 남는다.
const CONSENT_VERSION = '2026-09-17.2';
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 이용 유형 — 개인 · 팀 · 시설 사업자 · 대회 주최자. 화면의 선택지와 값이 같아야 한다.
const TYPES = new Set(['personal', 'team', 'facility', 'tournament']);

const fail = (error, status = 400) => Response.json({ ok: false, error }, { status });

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return fail('invalid_body');
  }

  // 사람에게는 보이지 않는 칸이다. 채워져 있으면 자동 입력기라 저장하지 않고 성공처럼 돌려보낸다.
  if (body?.website) return Response.json({ ok: true });

  const name = typeof body?.name === 'string' ? body.name.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  const type = typeof body?.type === 'string' ? body.type : '';
  const from = typeof body?.from === 'string' ? body.from.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 40) : '';

  if (!name || name.length > 50) return fail('invalid_name');
  if (!email || email.length > 254 || !EMAIL.test(email)) return fail('invalid_email');
  if (!TYPES.has(type)) return fail('invalid_type');
  if (body?.consent !== true) return fail('consent_required');

  const record = { name, email, type, from, consentVersion: CONSENT_VERSION, submittedAt: new Date().toISOString() };
  const key = createHash('sha256').update(email).digest('hex');

  try {
    await put(`waitlist/${key}.json`, JSON.stringify(record), {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
    });
  } catch (error) {
    console.error('waitlist: put failed', error);
    return fail('store_failed', 500);
  }

  return Response.json({ ok: true });
}
