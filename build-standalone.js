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

const target = path.join(dir, "매점POS.html");
fs.writeFileSync(target, out, "utf8");

const mb = (Buffer.byteLength(out, "utf8") / 1024 / 1024).toFixed(2);
console.log(`✅ 매점POS.html 생성 완료 (${mb} MB)`);
console.log(`   엑셀 라이브러리 내장: ${(lib.length / 1024).toFixed(0)} KB`);
console.log(`   → 이 파일 하나만 복사하면 인터넷 없이 실행됩니다.`);
