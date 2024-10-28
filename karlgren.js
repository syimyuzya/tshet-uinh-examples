/* 高本漢擬音
 *
 * 擬音來自高本漢後期著作：
 *
 * - Grammata Serica. BMFEA, 1940, 12: 1–471.
 * - Compendium of Phonetics in Ancient and Archaic Chinese. BMFEA, 1954, 26: 211–367.
 * - Grammata Serica Recensa. BMFEA, 1957, 29: 1–332.
 * - 中國聲韻學大綱. 張洪年, 譯. 香港: 香港中文大學研究院中國語言文學會, 1968. (臺北: 中華叢書編審委員會, 1972)
 * - 中上古漢語音韻綱要. 聶鴻音, 譯. 濟南: 齊魯書社, 1987.
 * - 漢文典（修訂本）. 潘悟雲, 楊劍橋, 陳重業, 張洪明, 編譯. 上海: 上海辭書出版社, 1997.
 *
 * 以及後來學者的整理：
 *
 * - Samuel E. Martin. The Phonemes of Ancient Chinese. JAOS, 1953, 73 (2): Supplement.
 * - 李榮. 高本漢構擬的切韵音. 切韵音系. 北京: 科學出版社, 1956: 104–106. (黃笑山, 校訂. 北京: 商務印書館, 2020)
 * - 李方桂. 中古音系. 上古音研究. 北京: 商務印書館, 1980: 5–9.
 * - 潘悟雲. 諸家《切韻》聲類擬音比較表, 諸家《切韻》韻母擬音比較表. 漢語歷史音韻學. 上海: 上海教育出版社, 2000: 59–61, 83–88.
 *
 * 這些後期著作與高本漢早期的 Études sur la phonologie chinoise（《中國音韻學研究》）相比，
 * 不僅個別聲韻母的擬音作了改動，所採用的音標字母、介音的拼寫風格也完全不同。
 * 再考慮到今天引用高本漢擬音一般是引用其後期擬音，因此本方案暫不收錄其早期擬音。
 *
 * 音標提供 3 種風格：
 *
 * - 原書音標：高本漢後期著作採用的拉丁字母音標
 * - 國際音標（原貌）：《中國音韻學研究》中譯本風格（但原書 ɡ 作 g，不採用）
 * - 國際音標（通用）：現在的中國通用音標符號（即比標準國際音標多 ȶ、ȡ、ȵ）
 *
 * 聲調提供 3 種風格：
 *
 * - 不標
 * - 平ˉ 上ˊ 去ˋ：Grammata Serica 和 Compendium 的標法
 * - 上꞉ 去˗：Grammata Serica Recensa 的標法
 *
 * @author unt
 */

const is = (...x) => 音韻地位.屬於(...x);
const when = (...x) => 音韻地位.判斷(...x);

const 音標字典 = {
  '原書音標': {
    ʰ: 'ʼ', ʱ: 'ʼ',
    ʔ: 'ꞏ', ɡ: 'g', ŋ: 'ng',
    ȶ: 't̑', ȡ: 'd̑', ȵ: 'ń', // 上加弧線是瑞典方言字母表腭化的一種方式，不是揚抑符
    ɕ: 'ś', ʑ: 'ź',
    ʂ: 'ṣ', ʐ: 'ẓ',
    x: 'χ', ɣ: 'γ',

    ă: 'ă', ɑ̆: 'ậ', ĕ: 'ĕ',
    ɛ: 'ä', ɔ: 'å',
    // 央次低元音原書作“ɒ”形，實際上是 ɐ 的斜體，不是很多人引用成的 ɒ。這個符號來自瑞典方言字母
    æ: 'ɛ', ɐ: 選項.央次低元音?.slice(0, 1) || 'ɐ',
    ɑ: 'â',
  },
  '國際音標（原貌）': {
    ʰ: 'ʻ', ʱ: 'ʻ', ʔ: 'ˀ', // ɡ: 'g',
    tʂ: 'ʈʂ', dʐ: 'ɖʐ',
    tɕ: 'ȶɕ', dʑ: 'ȡʑ',
  },
  '國際音標（通用）': {
    ʱ: 選項.濁送氣 || 'ʰ',
  },
};

if (!音韻地位) return [
  ['音標體系', [3].concat(Object.keys(音標字典))],
  ['聲調記號', [3, '不標', '平ˉ 上ˊ 去ˋ', '上꞉ 去˗']],
  ['央次低元音', 選項.音標體系?.includes('原書') ? [1, 'ɐ（準確）', 'ɒ（流行但不準確）'] : null],
  ['濁送氣', !選項.音標體系 || 選項.音標體系.includes('通用') ? [1, 'ʰ', 'ʱ'] : null],
];

function get聲母() {
  let 聲母 = {
    幫: 'p', 滂: 'pʰ', 並: 'bʱ', 明: 'm',
    端: 't', 透: 'tʰ', 定: 'dʱ', 泥: 'n', 來: 'l',
    知: 'ȶ', 徹: 'ȶʰ', 澄: 'ȡʱ', 孃: 'ȵ',
    見: 'k', 溪: 'kʰ', 羣: 'ɡʱ', 疑: 'ŋ',
    影: 'ʔ', 曉: 'x', 匣: 'ɣ', 以: '',
    精: 'ts', 清: 'tsʰ', 從: 'dzʱ', 心: 's', 邪: 'z',
    莊: 'tʂ', 初: 'tʂʰ', 崇: 'dʐʱ', 生: 'ʂ', 俟: 'dʐʱ',
    章: 'tɕ', 昌: 'tɕʰ', 船: 'dʑʱ', 書: 'ɕ', 常: 'ʑ', 日: 'ȵʑ', 云: 'j',
    // 注意云以、常船是顛倒的，俟同崇
  }[音韻地位.母];
  return 聲母;
}

function get韻母() {
  const 韻 = {
    文: '殷', 魂: '痕', 灰: '咍', 凡: '嚴',
    之: '脂', 夬: '佳', // 這兩對高本漢無法找到區分方法
  }[音韻地位.韻] ?? 音韻地位.韻;
  const 元音表 = {
    // 三等的 ə、o 暫加短音符以便與一等區分，之後移除
    i: '脂　　　　　', ï: '　　　　　　', u: '虞東',
    ĕ: '　　　真幽　', ə̆: '　蒸　殷　侵', ŏ: '魚鍾', e̯i: '微', ə̯̆u: '尤',
    e: '　青齊先蕭添', ə: '　登　痕　　', o: '模冬', ie̯: '支', ə̯u: '侯',
    ɛ: '　清祭仙宵鹽', ɐ: '　庚廢元　嚴', ɔ: '　江',
    æ: '　耕　臻　　',
    ă: '　　皆山　咸', ɑ̆: '　　咍　　覃',
    a: '麻陽佳刪肴銜', ɑ: '歌唐泰寒豪談',
  };
  const 韻尾列表 = is`舒聲` ? ['', ...'ŋinum'] : [...' k t p'];

  let 韻核 = Object.keys(元音表).find(e => 元音表[e].includes(韻));
  let 韻尾 = 韻尾列表[元音表[韻核].indexOf(韻)];
  韻核 = 韻核.replace('ə̆', 'ə').replace('ŏ', 'o');
  let 介音 = '';
  if (is`止攝 (鈍音 非 云母 或 來母)`) 介音 += 'j'; // 云母已經是 j，無需加
  if (is`三等 非 止攝`) 介音 += 'i̯';
  if (is`四等`) 介音 += 'i';
  介音 += when([
    ['模冬灰文魂韻', 'u'],
    ['歌寒韻 非 開口', 'u'], // 戈桓
    ['真韻 合口 (A類 或 銳音 非 莊組)', 'u'], // 諄
    ['合口 或 魚鍾凡韻', 'w'],
    ['幫組', [
      ['微韻', 'w'],
      ['廢元韻 或 庚韻 三等', 'w'], // ɐ
      ['耕韻 明母', 'w'], // æ
      ['陽夬刪韻', 'w'], // a, 但麻佳韻原書無 w（儘管擬音不分佳夬）
      ['皆韻 或 山韻 入聲', 'w'], // ă，但山韻舒聲原書無 w
      ['泰韻 或 唐韻 舒聲', 'w'], // ɑ，同歌寒，但唐韻入聲原書無 w
      // 個別字合口的情況不計入，如《漢文典》中：
      // “邊”歸合口，但同小韻的“編”歸開口
      // “憫”歸合口，但同小韻的“緡”歸開口
    ]],
    ['', ''],
  ], '', true);

  return 介音 + 韻核 + 韻尾;
}

function get聲調() {
  if (選項.聲調記號 === '四角標圈') return {

  };
  const 聲調記號字典 = Object.fromEntries(選項.聲調記號.split(' ').map(e => [...e]));
  return 聲調記號字典[音韻地位.聲] ?? '';
}

let 音節 = get聲母() + get韻母() + get聲調();
Object.entries(音標字典[選項.音標體系]).forEach(([k, v]) => { 音節 = 音節.replace(k, v); });
return 音節;
