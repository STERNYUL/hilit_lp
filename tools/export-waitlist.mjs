// 서비스 준비중 페이지(coming-soon.html)에서 받은 출시 알림 신청 명단을 CSV 로 뽑는다.
//   node --env-file=.env.local tools/export-waitlist.mjs > waitlist.csv
// 🔴 .env.local 에 BLOB_READ_WRITE_TOKEN 이 있어야 한다 — 없으면 `npx vercel env pull .env.local`.
// 🔴 뽑은 CSV 는 개인정보다. 저장소에 커밋하지 않는다(.gitignore 의 *.csv).
import { get, list } from '@vercel/blob';

const rows = [];
let cursor;
do {
  const page = await list({ prefix: 'waitlist/', cursor });
  for (const blob of page.blobs) {
    const { stream } = await get(blob.pathname, { access: 'private', useCache: false });
    rows.push(JSON.parse(await new Response(stream).text()));
  }
  cursor = page.hasMore ? page.cursor : undefined;
} while (cursor);

rows.sort((a, b) => a.submittedAt.localeCompare(b.submittedAt));
const TYPE_LABELS = { personal: '개인', team: '팀', facility: '시설 사업자', tournament: '대회 주최자' };
const cell = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
const header = ['submittedAt', 'name', 'email', 'type', 'from', 'consentVersion'];
const value = (row, key) => (key === 'type' ? TYPE_LABELS[row.type] ?? row.type : row[key]);
console.log([header.join(','), ...rows.map((row) => header.map((key) => cell(value(row, key))).join(','))].join('\n'));
console.error(`${rows.length}명`);
