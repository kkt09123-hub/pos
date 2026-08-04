/**
 * 단독 실행 파일 빌드
 *   index.html + xlsx.full.min.js  →  매점POS.html  (파일 하나, 인터넷 0% 의존)
 * 사용: node build-standalone.js
 */
const fs = require("fs");
const path = require("path");

const dir = __dirname;
const html = fs.readFileSync(path.join(dir, "index.html"), "utf8");
const lib = fs.readFileSync(path.join(dir, "xlsx.full.min.js"));
const b64 = lib.toString("base64");

const TAG = '<script id="xlsxlib" type="text/plain"></script>';
if (!html.includes(TAG)) {
  console.error("❌ 삽입 위치(xlsxlib 태그)를 찾지 못했습니다.");
  process.exit(1);
}

let out = html.replace(TAG, '<script id="xlsxlib" type="text/plain">' + b64 + "</script>");

// 단독 파일에서는 외부 파일/서비스워커가 없으므로 표시만 구분
out = out.replace('const APP_VER="', 'const STANDALONE=true;const APP_VER="');

// 배포 폴더로 산출 (파일명은 ASCII — 배치파일이 한글 경로를 오해하는 문제 방지)
const outDir = path.join(path.dirname(dir), "매점POS_배포");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "POS.html"), out, "utf8");
fs.copyFileSync(path.join(dir, "사용설명서.txt"), path.join(outDir, "사용설명서.txt"));

const mb = (Buffer.byteLength(out, "utf8") / 1024 / 1024).toFixed(2);
console.log(`✅ POS.html 생성 (${mb} MB, 엑셀 라이브러리 ${(lib.length / 1024).toFixed(0)}KB 내장)`);
console.log(`   배포 폴더: ${outDir}`);
