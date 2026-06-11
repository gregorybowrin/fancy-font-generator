"use client";

import { useState } from "react";
import { Copy, Check, Sparkles, ChevronLeft, ChevronRight, LayoutGrid, GalleryHorizontal } from "lucide-react";

// The Unicode conversion engine
const alphabets = {
  normal: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  serif: "𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝐀𝐁𝐶𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙",
  serifItalic: "𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍",
  serifBoldItalic: "𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁",
  sans: "𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹",
  sansBold: "𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭",
  sansItalic: "𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡",
  sansBoldItalic: "𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕",
  script: "𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵",
  boldScript: "𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝓏𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩",
  fraktur: "𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ",
  boldFraktur: "𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅",
  doubleStruck: "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ",
  monospace: "𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉",
};

const DECORATIONS = {
  sparkles: { prefix: "✧･ﾟ: *✧･ﾟ:* ", suffix: " *:･ﾟ✧*:･ﾟ✧" },
  ribbon: { prefix: "⋆ 🎀  ", suffix: "  🎀 ⋆" },
  shootingStar: { prefix: "╰┈➤  ", suffix: "" },
  brackets: { prefix: "【☆】 ", suffix: " 【☆】" },
  hearts: { prefix: "♡♡ ", suffix: " ♡♡" },
  flowers: { prefix: "❀✿ ", suffix: " ✿❀" },
  cat: { prefix: "ฅ^•ﻌ•^ฅ ", suffix: "" },
  music: { prefix: "♫♪.ılılıll|̲̅̅●̲̅̅|̲̅̅=̲̅̅|̲̅̅●̲̅̅|llılılı.♫♪ ", suffix: "" },
  sword: { prefix: "o()==[::::::::::::::::> ", suffix: "" },
  wings: { prefix: "ʚ ", suffix: " ɞ" },
  cloud: { prefix: "☁️ ", suffix: " ☁️" },
  none: { prefix: "", suffix: "" }
};

const convertText = (text: string, font: string, decoration: keyof typeof DECORATIONS) => {
  let processedText = text;

  // Handle combining characters or font mappings
  if (font !== "normal") {
    if (font === "slash") {
      processedText = Array.from(text).map(char => char + '\u0336').join('');
    } else if (font === "underline") {
      processedText = Array.from(text).map(char => char + '\u0332').join('');
    } else {
      const targetStr = alphabets[font as keyof typeof alphabets];
      if (targetStr) {
        const targetArray = Array.from(targetStr);
        const normalArray = Array.from(alphabets.normal);
        processedText = Array.from(text).map(char => {
          const index = normalArray.indexOf(char);
          if (index !== -1 && targetArray[index]) {
            return targetArray[index];
          }
          return char;
        }).join('');
      }
    }
  }

  const deco = DECORATIONS[decoration] || DECORATIONS.none;
  return `${deco.prefix}${processedText}${deco.suffix}`;
};

type FontStyle = {
  name: string;
  id: string;
  font: string;
  decoration: keyof typeof DECORATIONS;
};

const FONT_STYLES: FontStyle[] = [
  { name: "Sparkle Script", id: "sparkleScript", font: "script", decoration: "sparkles" },
  { name: "Ribbon Serif", id: "ribbonSerif", font: "serifItalic", decoration: "ribbon" },
  { name: "Shooting Star Bold", id: "shootingStarBold", font: "sansBold", decoration: "shootingStar" },
  { name: "Star Brackets", id: "starBrackets", font: "monospace", decoration: "brackets" },
  { name: "Angel Wings", id: "angelWings", font: "script", decoration: "wings" },
  { name: "Cloud Sans", id: "cloudSans", font: "sans", decoration: "cloud" },
  { name: "Sword Gothic", id: "swordGothic", font: "fraktur", decoration: "sword" },
  { name: "Kitty Monospace", id: "kittyMono", font: "monospace", decoration: "cat" },
  { name: "Music Player", id: "musicPlayer", font: "normal", decoration: "music" },
  { name: "Floral Outline", id: "floralDouble", font: "doubleStruck", decoration: "flowers" },
  { name: "Heartfelt Script", id: "heartScript", font: "boldScript", decoration: "hearts" },
  { name: "Pure Script (No Deco)", id: "pureScript", font: "script", decoration: "none" },
  { name: "Pure Gothic (No Deco)", id: "pureFraktur", font: "fraktur", decoration: "none" },
  { name: "Classic Strikethrough", id: "slash", font: "slash", decoration: "none" },
];

export default function Home() {
  const [inputText, setInputText] = useState("Fancy Text Generator");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // New State for View Mode and Rolodex
  const [viewMode, setViewMode] = useState<"rolodex" | "grid">("rolodex");
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % FONT_STYLES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + FONT_STYLES.length) % FONT_STYLES.length);
  };

  return (
    <div className="flex-1 w-full flex flex-col items-center py-12">
      
      {/* Hero Header - Full Width Centered */}
      <div className="text-center max-w-3xl mb-12 w-full px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 mb-6 font-medium text-sm border border-blue-500/20">
          <Sparkles className="w-4 h-4" />
          100% Free - No Sign Up Required
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-white">
          The Ultimate <span className="text-gradient">Fancy Font</span> Generator
        </h1>
        <p className="text-xl text-neutral-400">
          Type your text below to instantly generate cool fonts for Instagram, TikTok, Twitter, and Discord. Just click to copy!
        </p>
      </div>

      {/* Main Content Layout Wrapper */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col xl:flex-row gap-8 items-start relative">
        <main className="flex-1 flex flex-col items-center w-full max-w-5xl mx-auto">

      {/* Primary Ad Zone 1 (Top) */}
      <div className="w-full max-w-4xl h-[90px] md:h-[150px] bg-neutral-900/50 border border-neutral-800 rounded-xl flex items-center justify-center text-neutral-600 mb-12">
        <span className="text-sm uppercase tracking-wider font-semibold">Advertisement Space</span>
      </div>

      {/* Main Input Area */}
      <div className="w-full max-w-4xl mb-8 relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your text here..."
          className="relative w-full bg-neutral-900 border border-neutral-700 rounded-2xl p-6 text-xl md:text-2xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all shadow-xl"
          rows={2}
        />
      </div>

      {/* View Toggle Bar */}
      <div className="flex bg-neutral-900 rounded-xl p-1 mb-8 border border-neutral-800 w-max mx-auto shadow-lg">
        <button 
          onClick={() => setViewMode('rolodex')} 
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
            viewMode === 'rolodex' 
              ? 'bg-neutral-800 text-white shadow-sm ring-1 ring-neutral-700' 
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
          }`}
        >
          <GalleryHorizontal className="w-4 h-4"/> 
          Rolodex View
        </button>
        <button 
          onClick={() => setViewMode('grid')} 
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
            viewMode === 'grid' 
              ? 'bg-neutral-800 text-white shadow-sm ring-1 ring-neutral-700' 
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
          }`}
        >
          <LayoutGrid className="w-4 h-4"/> 
          Grid View
        </button>
      </div>

      {/* Dynamic Results Area */}
      <div className="w-full max-w-5xl mb-12">
        
        {viewMode === "rolodex" ? (
          /* Rolodex Mode */
          <div className="glass rounded-3xl p-8 md:p-16 flex flex-col items-center justify-center min-h-[400px] relative shadow-2xl group overflow-hidden border border-neutral-700/50 bg-neutral-900/40">
            
            {/* Background Accent Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none"></div>

            {/* Navigation Buttons */}
            <button 
              onClick={handlePrev} 
              className="absolute left-4 md:left-8 p-3 md:p-4 bg-neutral-800/80 hover:bg-neutral-700 rounded-full text-white transition-all transform active:scale-95 shadow-lg border border-neutral-700 z-10 hover:ring-2 hover:ring-blue-500/50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={handleNext} 
              className="absolute right-4 md:right-8 p-3 md:p-4 bg-neutral-800/80 hover:bg-neutral-700 rounded-full text-white transition-all transform active:scale-95 shadow-lg border border-neutral-700 z-10 hover:ring-2 hover:ring-blue-500/50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Current Font Display */}
            <div className="flex flex-col items-center w-full px-16 md:px-24">
              <span className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-6 border border-blue-500/30 px-4 py-1.5 rounded-full bg-blue-500/10">
                {FONT_STYLES[currentIndex].name}
              </span>
              
              <div className="w-full max-w-3xl bg-black/40 rounded-2xl p-8 mb-8 border border-neutral-800/80 overflow-x-auto whitespace-nowrap scrollbar-hide shadow-inner text-center">
                <p className="text-3xl md:text-4xl lg:text-5xl text-white leading-relaxed py-4">
                  {inputText ? convertText(inputText, FONT_STYLES[currentIndex].font, FONT_STYLES[currentIndex].decoration) : FONT_STYLES[currentIndex].name}
                </p>
              </div>

              <button
                onClick={() => handleCopy(
                  inputText ? convertText(inputText, FONT_STYLES[currentIndex].font, FONT_STYLES[currentIndex].decoration) : FONT_STYLES[currentIndex].name, 
                  FONT_STYLES[currentIndex].id
                )}
                className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:-translate-y-1 ${
                  copiedId === FONT_STYLES[currentIndex].id
                    ? "bg-green-500 text-white" 
                    : "bg-white text-black hover:bg-neutral-200"
                }`}
              >
                {copiedId === FONT_STYLES[currentIndex].id ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                {copiedId === FONT_STYLES[currentIndex].id ? "Copied to Clipboard!" : "Copy Font"}
              </button>

              <div className="mt-8 flex gap-1">
                {FONT_STYLES.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? 'w-6 bg-blue-500' : 'w-1.5 bg-neutral-700'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Grid Mode */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FONT_STYLES.map((style) => {
              const generatedText = inputText ? convertText(inputText, style.font, style.decoration) : style.name;
              const isCopied = copiedId === style.id;

              return (
                <div 
                  key={style.id}
                  className="glass rounded-xl p-5 hover:bg-neutral-800/60 transition-colors flex flex-col border border-neutral-800"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-neutral-400">
                      {style.name}
                    </span>
                    <button
                      onClick={() => handleCopy(generatedText, style.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${
                        isCopied 
                          ? "bg-green-500/20 text-green-400" 
                          : "bg-white text-black hover:bg-neutral-200"
                      }`}
                    >
                      {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {isCopied ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="flex-1 bg-black/40 rounded-lg p-4 overflow-x-auto whitespace-nowrap scrollbar-hide border border-neutral-800/50">
                    <p className="text-2xl text-white">
                      {generatedText}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Secondary Ad Zone 2 (Bottom) */}
      <div className="w-full max-w-4xl h-[90px] bg-neutral-900/50 border border-neutral-800 rounded-xl flex items-center justify-center text-neutral-600 mb-12">
        <span className="text-sm uppercase tracking-wider font-semibold">Advertisement Space</span>
      </div>

      {/* SEO Content Section */}
      <section className="w-full max-w-4xl prose prose-invert opacity-80">
        <h2>How to use this Fancy Font Generator?</h2>
        <p>
          Simply type your normal text into the large box at the top of the page. Our tool will instantly convert your text into dozens of cool, fancy, and stylish unicode variants. Use our beautiful Rolodex view to flip through fonts in large text, or switch to Grid view to see all options at a glance. Find the font you like best, and click the &quot;Copy&quot; button. You can then paste it anywhere—your Instagram bio, TikTok comments, Twitter handle, or Discord messages!
        </p>
      </section>

        </main>

        {/* Right Sidebar Ad Zone - Sticky */}
        <aside className="hidden xl:flex w-[300px] flex-col shrink-0 sticky top-12 h-[600px]">
          <div className="w-full h-full bg-neutral-900/50 border border-neutral-800 rounded-xl flex items-center justify-center text-neutral-600 shadow-xl">
            <span className="text-sm uppercase tracking-wider font-semibold text-center px-4 leading-relaxed">Vertical<br/>Advertisement<br/>Space</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
